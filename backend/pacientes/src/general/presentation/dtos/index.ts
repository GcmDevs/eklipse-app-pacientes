import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import {
  EstadoAnimoCode,
  FactorEstadoAnimoCode,
  RegionCorporalSintomaCode,
} from '@gen/general/domain/types';
export * from './catalogo-sintomas-response.dto';
export * from './paciente-response.dto';

export class RegistrarEstadoAnimoDto {
  @ApiProperty()
  @IsNotEmpty()
  estadoAnimoCode: EstadoAnimoCode;

  @ApiProperty()
  @IsNotEmpty()
  factorEstadoAnimoCode: FactorEstadoAnimoCode;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(250)
  descripcionFactorEstadoAnimo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  comentarioAdicional?: string;
}

export class RegistrarSintomaDto {
  @ApiProperty({ enum: [1, 2, 3, 4, 5], example: 1 })
  @IsInt()
  @Min(1)
  @Max(5)
  regionCorporalCode: RegionCorporalSintomaCode;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  sintomaId: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  @Min(1)
  intensidadId: number;
}
