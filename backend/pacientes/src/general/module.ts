import { Module } from '@nestjs/common';
import { EstadoAnimoController, SintomasController } from './presentation/controllers';
import {
  ConsultarCatalogoSintomasImpl,
  RegistrarEstadoAnimoImpl,
  RegistrarSintomaImpl,
} from './infrastructure/services';

@Module({
  controllers: [EstadoAnimoController, SintomasController],
  providers: [ConsultarCatalogoSintomasImpl, RegistrarEstadoAnimoImpl, RegistrarSintomaImpl],
})
export class GeneralModule {}
