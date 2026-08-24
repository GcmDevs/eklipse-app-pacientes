import { EstadoAnimoCode, FactorEstadoAnimoCode } from '@gen/general/domain/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('APPACREGESTANIM')
export class RegistroEstadoAnimoOrm {
  @PrimaryGeneratedColumn({ name: 'OID' })
  id: number;

  @Column({ name: 'GENPACIEN' })
  pacienteId: number;

  @Column({ name: 'ESTADOANIMO' })
  estadoAnimoCode: EstadoAnimoCode;

  @Column({ name: 'FACTESTANIMO' })
  factorEstadoAnimoCode: FactorEstadoAnimoCode;

  @Column({ name: 'FACTESTANIMOINFOADI', length: 500, nullable: true })
  descripcionFactorEstadoAnimo: string;

  @Column({ name: 'COMENTARIOADICIO', length: 500, nullable: true })
  comentarioAdicional: string;

  @Column({ name: 'FECHREG' })
  createdAt: Date;
}
