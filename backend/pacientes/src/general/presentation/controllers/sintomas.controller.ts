import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CommonGuards } from '@common/presentation/decorators';
import { ConsultarCatalogoSintomasImpl } from '@gen/general/infrastructure/services';
import { RegionCorporalSintomasResponseDto } from '@gen/general/presentation/dtos';

@CommonGuards()
@ApiTags('Sintomas')
@Controller('v1/gen/sintomas')
export class SintomasController {
  constructor(private _consultarCatalogoSintomas: ConsultarCatalogoSintomasImpl) {}

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
}
