import { Module } from '@nestjs/common';
import {
  EstadoAnimoController,
  PacientesController,
  SintomasController,
} from './presentation/controllers';
import {
  ConsultarCatalogoSintomasImpl,
  ConsultarPacienteAutenticadoImpl,
  RegistrarEstadoAnimoImpl,
  RegistrarSintomaImpl,
} from './infrastructure/services';

@Module({
  controllers: [EstadoAnimoController, PacientesController, SintomasController],
  providers: [
    ConsultarCatalogoSintomasImpl,
    ConsultarPacienteAutenticadoImpl,
    RegistrarEstadoAnimoImpl,
    RegistrarSintomaImpl,
  ],
})
export class GeneralModule {}
