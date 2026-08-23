$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies @('System.dll', 'System.Drawing.dll') -TypeDefinition @"
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

public static class BodyMapImageTools
{
    public static void ExtractEmbeddedPng(string svgPath, string pngPath)
    {
        var svg = File.ReadAllText(svgPath);
        var marker = "data:image/png;base64,";
        var start = svg.IndexOf(marker, StringComparison.OrdinalIgnoreCase);
        if (start < 0) throw new InvalidOperationException("Embedded PNG not found");
        start += marker.Length;
        var end = svg.IndexOf('"', start);
        if (end < 0) throw new InvalidOperationException("Embedded PNG terminator not found");
        var base64 = svg.Substring(start, end - start);
        File.WriteAllBytes(pngPath, Convert.FromBase64String(base64));
    }

    public static void RemoveBackgroundAndCrop(string inputPath, string outputPath, byte threshold, int padding)
    {
        using (var source = new Bitmap(inputPath))
        using (var bitmap = new Bitmap(source.Width, source.Height, PixelFormat.Format32bppArgb))
        using (var graphics = Graphics.FromImage(bitmap))
        {
            graphics.DrawImage(source, 0, 0, source.Width, source.Height);

            var rect = new Rectangle(0, 0, bitmap.Width, bitmap.Height);
            var data = bitmap.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            try
            {
                int stride = data.Stride;
                int bytes = stride * bitmap.Height;
                byte[] pixels = new byte[bytes];
                Marshal.Copy(data.Scan0, pixels, 0, bytes);

                int width = bitmap.Width;
                int height = bitmap.Height;
                bool[] visited = new bool[width * height];
                var queue = new Queue<int>();

                Action<int, int> enqueueIfBackground = (x, y) =>
                {
                    if (x < 0 || y < 0 || x >= width || y >= height) return;
                    int index = y * width + x;
                    if (visited[index]) return;
                    int offset = y * stride + x * 4;
                    byte b = pixels[offset + 0];
                    byte g = pixels[offset + 1];
                    byte r = pixels[offset + 2];
                    byte a = pixels[offset + 3];
                    if (a == 0) return;
                    if (r >= threshold && g >= threshold && b >= threshold)
                    {
                        visited[index] = true;
                        queue.Enqueue(index);
                    }
                };

                for (int x = 0; x < width; x++)
                {
                    enqueueIfBackground(x, 0);
                    enqueueIfBackground(x, height - 1);
                }

                for (int y = 0; y < height; y++)
                {
                    enqueueIfBackground(0, y);
                    enqueueIfBackground(width - 1, y);
                }

                int[] dx = new[] { 1, -1, 0, 0 };
                int[] dy = new[] { 0, 0, 1, -1 };

                while (queue.Count > 0)
                {
                    int index = queue.Dequeue();
                    int x = index % width;
                    int y = index / width;
                    int offset = y * stride + x * 4;
                    pixels[offset + 3] = 0;

                    for (int i = 0; i < 4; i++)
                    {
                        int nx = x + dx[i];
                        int ny = y + dy[i];
                        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
                        int nindex = ny * width + nx;
                        if (visited[nindex]) continue;
                        int noffset = ny * stride + nx * 4;
                        byte nb = pixels[noffset + 0];
                        byte ng = pixels[noffset + 1];
                        byte nr = pixels[noffset + 2];
                        byte na = pixels[noffset + 3];
                        if (na == 0) continue;
                        if (nr >= threshold && ng >= threshold && nb >= threshold)
                        {
                            visited[nindex] = true;
                            queue.Enqueue(nindex);
                        }
                    }
                }

                Marshal.Copy(pixels, 0, data.Scan0, bytes);

                int minX = width;
                int minY = height;
                int maxX = -1;
                int maxY = -1;

                for (int y = 0; y < height; y++)
                {
                    for (int x = 0; x < width; x++)
                    {
                        int offset = y * stride + x * 4;
                        if (pixels[offset + 3] > 0)
                        {
                            if (x < minX) minX = x;
                            if (y < minY) minY = y;
                            if (x > maxX) maxX = x;
                            if (y > maxY) maxY = y;
                        }
                    }
                }

                if (maxX < minX || maxY < minY)
                {
                    bitmap.Save(outputPath, ImageFormat.Png);
                    return;
                }

                minX = Math.Max(0, minX - padding);
                minY = Math.Max(0, minY - padding);
                maxX = Math.Min(width - 1, maxX + padding);
                maxY = Math.Min(height - 1, maxY + padding);

                var cropRect = new Rectangle(minX, minY, maxX - minX + 1, maxY - minY + 1);

                using (var cropped = bitmap.Clone(cropRect, PixelFormat.Format32bppArgb))
                {
                    cropped.Save(outputPath, ImageFormat.Png);
                }
            }
            finally
            {
                bitmap.UnlockBits(data);
            }
        }
    }
}
"@

$assets = @(
    @{ Svg = 'src/assets/personaje_salud.svg'; Png = 'src/assets/personaje_salud.png' },
    @{ Svg = 'src/assets/personaje_mujer.svg'; Png = 'src/assets/personaje_mujer.png' }
)

foreach ($asset in $assets) {
    $tempPath = [System.IO.Path]::ChangeExtension($asset.Png, '.raw.png')
    [BodyMapImageTools]::ExtractEmbeddedPng($asset.Svg, $tempPath)
    [BodyMapImageTools]::RemoveBackgroundAndCrop($tempPath, $asset.Png, 246, 12)
    Remove-Item -LiteralPath $tempPath
}

foreach ($path in 'src/assets/personaje_salud.png', 'src/assets/personaje_mujer.png') {
    $image = [System.Drawing.Image]::FromFile((Resolve-Path $path))
    try {
        Write-Output "$path $($image.Width)x$($image.Height)"
    } finally {
        $image.Dispose()
    }
}
