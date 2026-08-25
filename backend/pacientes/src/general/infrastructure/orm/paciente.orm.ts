import { GeneroCode, TipoDocumentoCode } from '@gen/general/domain/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('GENPACIEN')
export class PacienteOrm {
  @PrimaryGeneratedColumn({ name: 'OID' })
  id: number;

  @Column({ name: 'PACTIPDOC' })
  tipoDocumentoCode: TipoDocumentoCode;

  @Column({ name: 'PACNUMDOC' })
  documento: string;

  @Column({ name: 'GPANOMCOM' })
  nombreCompleto: string;

  @Column({ name: 'GPAFECNAC' })
  fechaNacimiento: string;

  @Column({ name: 'GPASEXPAC' })
  generoCode: GeneroCode;
}
