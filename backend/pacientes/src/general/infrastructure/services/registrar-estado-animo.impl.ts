import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseSource } from '@common/infrastructure/services';
import {
  FACTOR_ESTADO_ANIMO,
  estadoAnimoTypeFactory,
  factorEstadoAnimoTypeFactory,
} from '@gen/general/domain/types';
import { RegistroEstadoAnimoOrm } from '@gen/general/infrastructure/orm';
import { RegistrarEstadoAnimoDto } from '@gen/general/presentation/dtos';
import { Raw } from 'typeorm';

const MIN_HOURS_BETWEEN_REGISTERS = 6;

@Injectable()
export class RegistrarEstadoAnimoImpl extends BaseSource {
  public async fetchToday(): Promise<RegistroEstadoAnimoOrm | null> {
    try {
      const registroEstadoAnimoRp = this.conn.getRepository(RegistroEstadoAnimoOrm);
      const { todayStart, todayEnd } = this._todayRange();

      return await registroEstadoAnimoRp.findOne({
        where: {
          pacienteId: this.auth.patientId,
          createdAt: Raw(alias => `${alias} >= :todayStart AND ${alias} < :todayEnd`, {
            todayStart,
            todayEnd,
          }),
        },
        order: { createdAt: 'DESC' },
      });
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  public async execute(payload: RegistrarEstadoAnimoDto): Promise<RegistroEstadoAnimoOrm> {
    const qr = this.conn.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      estadoAnimoTypeFactory(payload.estadoAnimoCode);
      factorEstadoAnimoTypeFactory(payload.factorEstadoAnimoCode);
      if (
        payload.factorEstadoAnimoCode === FACTOR_ESTADO_ANIMO.OTRO.getCode() &&
        !payload.descripcionFactorEstadoAnimo?.trim()
      ) {
        throw new Error('Debe ingresar la descripción del factor de estado de animo');
      }

      const registroEstadoAnimoRp = qr.manager.getRepository(RegistroEstadoAnimoOrm);
      const pacienteId = this.auth.patientId;
      const now = new Date();
      const { todayStart, todayEnd } = this._todayRange(now);

      const registroDeHoy = await registroEstadoAnimoRp.findOne({
        where: {
          pacienteId,
          createdAt: Raw(alias => `${alias} >= :todayStart AND ${alias} < :todayEnd`, {
            todayStart,
            todayEnd,
          }),
        },
      });

      if (registroDeHoy) {
        throw new Error('Ya existe un registro de estado de animo para el dia de hoy');
      }

      const ultimoRegistro = await registroEstadoAnimoRp.findOne({
        where: { pacienteId },
        order: { createdAt: 'DESC' },
      });

      if (ultimoRegistro) {
        const sixHoursAgo = new Date(now.getTime() - MIN_HOURS_BETWEEN_REGISTERS * 60 * 60 * 1000);

        if (ultimoRegistro.createdAt > sixHoursAgo) {
          throw new Error(
            'Deben pasar al menos 6 horas desde el ultimo registro de estado de animo'
          );
        }
      }

      const registro = new RegistroEstadoAnimoOrm();
      registro.pacienteId = pacienteId;
      registro.estadoAnimoCode = payload.estadoAnimoCode;
      registro.factorEstadoAnimoCode = payload.factorEstadoAnimoCode;
      registro.descripcionFactorEstadoAnimo = payload.descripcionFactorEstadoAnimo?.trim() || null;
      registro.comentarioAdicional = payload.comentarioAdicional?.trim() || null;
      registro.createdAt = now;

      const response = await registroEstadoAnimoRp.save(registro);

      await qr.commitTransaction();

      return response;
    } catch (error: any) {
      await qr.rollbackTransaction();
      throw new BadRequestException(error.message);
    } finally {
      await qr.release();
    }
  }

  private _todayRange(date = new Date()) {
    const todayStart = new Date(date);
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    return { todayStart, todayEnd };
  }
}
