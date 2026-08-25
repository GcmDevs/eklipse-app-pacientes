import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CommonGuards } from '@common/presentation/decorators';
import {
  ConsultarCatalogoSintomasImpl,
  RegistrarSintomaImpl,
} from '@gen/general/infrastructure/services';
import {
  RegionCorporalSintomasResponseDto,
  RegistrarSintomaDto,
} from '@gen/general/presentation/dtos';

@CommonGuards()
@ApiTags('Sintomas')
@Controller('v1/gen/sintomas')
export class SintomasController {
  constructor(
    private _consultarCatalogoSintomas: ConsultarCatalogoSintomasImpl,
    private _registrarSintoma: RegistrarSintomaImpl
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Consultar el catálogo de síntomas',
    description:
      'Obtiene las regiones corporales con sus síntomas, accesos rápidos e intensidades.',
  })
  @ApiOkResponse({
    description: 'Catálogo de síntomas disponible para el paciente.',
    type: RegionCorporalSintomasResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'No fue posible consultar el catálogo de síntomas.' })
  @ApiUnauthorizedResponse({ description: 'El token no fue proporcionado o no es válido.' })
  public async fetchCatalogo() {
    return await this._consultarCatalogoSintomas.execute();
  }

  @Post()
  @ApiOperation({
    summary: 'Registrar un sintoma',
    description:
      'Registra el sintoma para el paciente autenticado. Un mismo sintoma solo puede registrarse una vez al dia.',
  })
  @ApiCreatedResponse({ description: 'Sintoma registrado correctamente.' })
  @ApiBadRequestResponse({ description: 'La region, el sintoma o la intensidad no son validos.' })
  @ApiConflictResponse({ description: 'El sintoma ya fue registrado durante el dia actual.' })
  @ApiUnauthorizedResponse({ description: 'El token no fue proporcionado o no es valido.' })
  public async registrar(@Body() payload: RegistrarSintomaDto) {
    return await this._registrarSintoma.execute(payload);
  }
}
