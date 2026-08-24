import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommonGuards } from '@common/presentation/decorators';
import { RegistrarEstadoAnimoImpl } from '@gen/general/infrastructure/services';
import { RegistrarEstadoAnimoDto } from '../dtos';

@CommonGuards()
@ApiTags('Estado animo')
@Controller('v1/gen/estado-animo')
export class EstadoAnimoController {
  constructor(private _registrarEstadoAnimo: RegistrarEstadoAnimoImpl) {}

  @Get('history')
  public async fetchHistory() {
    return await this._registrarEstadoAnimo.fetchHistory();
  }

  @Get('today')
  public async fetchToday() {
    return await this._registrarEstadoAnimo.fetchToday();
  }

  @Post()
  public async registrar(@Body() payload: RegistrarEstadoAnimoDto) {
    return await this._registrarEstadoAnimo.execute(payload);
  }
}
