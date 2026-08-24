import { Module } from '@nestjs/common';
import { EstadoAnimoController, SintomasController } from './presentation/controllers';
import {
  ConsultarCatalogoSintomasImpl,
  RegistrarEstadoAnimoImpl,
} from './infrastructure/services';

@Module({
  controllers: [EstadoAnimoController, SintomasController],
  providers: [ConsultarCatalogoSintomasImpl, RegistrarEstadoAnimoImpl],
})
export class GeneralModule {}
