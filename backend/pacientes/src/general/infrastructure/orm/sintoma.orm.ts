import { RegionCorporalSintomaCode } from '@gen/general/domain/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('APPACSINTOMA')
export class SintomaOrm {
  @PrimaryGeneratedColumn({ name: 'OID' })
  id: number;

  @Column({ name: 'REGIONCORPORAL' })
  regionCorporalCode: RegionCorporalSintomaCode;

  @Column({ name: 'DESCRIPCION' })
  descripcion: string;
}
