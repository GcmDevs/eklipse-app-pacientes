import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommonGuards } from '@common/presentation/decorators';
import { ConsultarCatalogoSintomasImpl } from '@gen/general/infrastructure/services';

@CommonGuards()
@ApiTags('Sintomas')
@Controller('v1/gen/sintomas')
export class SintomasController {
  constructor(private _consultarCatalogoSintomas: ConsultarCatalogoSintomasImpl) {}

  @Get()
  public async fetchCatalogo() {
    return await this._consultarCatalogoSintomas.execute();
  }
}
