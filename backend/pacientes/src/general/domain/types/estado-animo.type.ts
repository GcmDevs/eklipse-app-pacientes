import { CtmType } from '@common/domain/types';

export type EstadoAnimoCode = 1 | 2 | 3 | 4 | 5 | 6;

export class EstadoAnimoType extends CtmType<EstadoAnimoCode> {}

const TRANQUILO = new EstadoAnimoType(1, 'TRANQUILO');
const ALEGRE = new EstadoAnimoType(2, 'ALEGRE');
const PREOCUPADO = new EstadoAnimoType(3, 'PREOCUPADO');
const TRISTE = new EstadoAnimoType(4, 'TRISTE');
const CANSADO = new EstadoAnimoType(5, 'CANSADO');
const DESMOTIVADO = new EstadoAnimoType(6, 'DESMOTIVADO');

export function estadoAnimoTypeFactory(code: EstadoAnimoCode): EstadoAnimoType {
  switch (code) {
    case 1:
      return TRANQUILO;
    case 2:
      return ALEGRE;
    case 3:
      return PREOCUPADO;
    case 4:
      return TRISTE;
    case 5:
      return CANSADO;
    case 6:
      return DESMOTIVADO;
    default:
      throw new Error('No existe estado de animo con este codigo');
  }
}

export const ESTADO_ANIMO = { TRANQUILO, ALEGRE, PREOCUPADO, TRISTE, CANSADO, DESMOTIVADO };

export const ESTADO_ANIMO_VALUES = Object.values(ESTADO_ANIMO);
