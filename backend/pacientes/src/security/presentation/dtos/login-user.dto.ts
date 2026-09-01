import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { GcmContexts } from '@common/domain/types';
import { castDataServices } from '@common/application/services';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(GcmContexts, { message: `${castDataServices.enumToString(GcmContexts)}` })
  context: GcmContexts;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  authAsUser: boolean;
}
