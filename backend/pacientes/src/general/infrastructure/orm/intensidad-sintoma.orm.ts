import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('APPACSINTITENSI')
export class IntensidadSintomaOrm {
  @PrimaryGeneratedColumn({ name: 'OID' })
  id: number;

  @Column({ name: 'APPACSINTOMA' })
  sintomaId: number;

  @Column({ name: 'DESCRIPCION' })
  descripcion: string;
}
