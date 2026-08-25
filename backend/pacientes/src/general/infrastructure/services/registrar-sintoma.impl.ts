import { Raw } from 'typeorm';
import { BadRequestException, ConflictException, HttpException, Injectable } from '@nestjs/common';
import { regionCorporalSintomaTypeFactory } from '@gen/general/domain/types';
import { RegistrarSintomaDto } from '@gen/general/presentation/dtos';
import { BaseSource } from '@common/infrastructure/services';
import {
  IntensidadSintomaOrm,
  RegistroSintomaOrm,
  SintomaOrm,
} from '@gen/general/infrastructure/orm';

@Injectable()
export class RegistrarSintomaImpl extends BaseSource {
  public async execute(payload: RegistrarSintomaDto): Promise<RegistroSintomaOrm> {
    const qr = this.conn.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();
    try {
      regionCorporalSintomaTypeFactory(payload.regionCorporalCode);

      const sintomaRp = qr.manager.getRepository(SintomaOrm);
      const intensidadRp = qr.manager.getRepository(IntensidadSintomaOrm);
      const registroRp = qr.manager.getRepository(RegistroSintomaOrm);

      const sintoma = await sintomaRp.findOne({ where: { id: payload.sintomaId } });
      const intensidad = await intensidadRp.findOne({ where: { id: payload.intensidadId } });

      if (!sintoma) throw new BadRequestException('El sintoma seleccionado no existe');
      if (sintoma.regionCorporalCode !== payload.regionCorporalCode) {
        throw new BadRequestException('El sintoma no pertenece a la region corporal seleccionada');
      }
      if (!intensidad || intensidad.sintomaId !== sintoma.id) {
        throw new BadRequestException('La intensidad no pertenece al sintoma seleccionado');
      }

      const pacienteId = this.auth.patientId;
      const now = new Date();
      const { todayStart, todayEnd } = this._todayRange(now);
      const registroDeHoy = await registroRp.findOne({
        where: {
          pacienteId,
          sintomaId: sintoma.id,
          createdAt: Raw(alias => `${alias} >= :todayStart AND ${alias} < :todayEnd`, {
            todayStart,
            todayEnd,
          }),
        },
      });

      if (registroDeHoy) throw new ConflictException('Este sintoma ya fue registrado hoy');

      const registro = registroRp.create({
        pacienteId,
        regionCorporalCode: payload.regionCorporalCode,
        sintomaId: sintoma.id,
        intensidadId: intensidad.id,
        createdAt: now,
      });
      const response = await registroRp.save(registro);

      await qr.commitTransaction();

      return response;
    } catch (error: any) {
      await qr.rollbackTransaction();
      if (this._isDuplicateRegisterError(error)) {
        throw new ConflictException('Este sintoma ya fue registrado hoy');
      }
      if (error instanceof HttpException) throw error;
      throw new BadRequestException(error.message);
    } finally {
      await qr.release();
    }
  }

  private _todayRange(date: Date) {
    const todayStart = new Date(date);
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    return { todayStart, todayEnd };
  }

  private _isDuplicateRegisterError(error: any) {
    const errorNumber = error?.number ?? error?.driverError?.number;
    return errorNumber === 2601 || errorNumber === 2627;
  }
}
