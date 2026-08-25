import { ApiProperty } from '@nestjs/swagger';
import { GeneroCode, TipoDocumentoCode } from '@gen/general/domain/types';

export class PacienteResponseDto {
  @ApiProperty({ example: 123 })
  id: number;

  @ApiProperty({ example: 1 })
  tipoDocumentoCode: TipoDocumentoCode;

  @ApiProperty({ example: '1234567890' })
  documento: string;

  @ApiProperty({ example: 'Maria Perez' })
  nombreCompleto: string;

  @ApiProperty({ example: '1990-05-20', format: 'date' })
  fechaNacimiento: string;

  @ApiProperty({ enum: [1, 2], example: 2 })
  generoCode: GeneroCode;
}
