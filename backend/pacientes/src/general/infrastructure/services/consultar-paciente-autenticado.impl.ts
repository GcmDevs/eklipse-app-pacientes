import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseSource } from '@common/infrastructure/services';
import { PacienteOrm } from '@gen/general/infrastructure/orm';

@Injectable()
export class ConsultarPacienteAutenticadoImpl extends BaseSource {
  public async execute(): Promise<PacienteOrm> {
    const pacienteRp = this.conn.getRepository(PacienteOrm);
    const paciente = await pacienteRp.findOne({
      where: { id: this.auth.patientId },
    });

    if (!paciente) {
      throw new NotFoundException('No se encontro la informacion del paciente autenticado');
    }

    return paciente;
  }
}
