import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { EstadoAnimoCode, FactorEstadoAnimoCode } from '@gen/general/domain/types';

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
