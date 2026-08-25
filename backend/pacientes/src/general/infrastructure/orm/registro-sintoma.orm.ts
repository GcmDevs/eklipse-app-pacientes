import { RegionCorporalSintomaCode } from '@gen/general/domain/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('APPACREGSINTOMA')
export class RegistroSintomaOrm {
  @PrimaryGeneratedColumn({ name: 'OID' })
  id: number;

  @Column({ name: 'GENPACIEN' })
  pacienteId: number;

  @Column({ name: 'REGIONCORPORAL' })
  regionCorporalCode: RegionCorporalSintomaCode;

  @Column({ name: 'APPACSINTOMA' })
  sintomaId: number;

  @Column({ name: 'APPACSINTITENSI' })
  intensidadId: number;

  @Column({ name: 'FECHREG' })
  createdAt: Date;
}
