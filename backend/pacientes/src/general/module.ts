import { Module } from '@nestjs/common';
import { EstadoAnimoController } from './presentation/controllers';
import { RegistrarEstadoAnimoImpl } from './infrastructure/services';

@Module({
  controllers: [EstadoAnimoController],
  providers: [RegistrarEstadoAnimoImpl],
})
export class GeneralModule {}
