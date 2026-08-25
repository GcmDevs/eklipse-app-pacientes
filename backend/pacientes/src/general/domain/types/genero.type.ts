import { CtmType } from '@common/domain/types';

export type GeneroCode = 1 | 2;

export class GeneroType extends CtmType<GeneroCode> {}

const MASCULINO = new GeneroType(1, 'MASCULINO');
const FEMENINO = new GeneroType(2, 'FEMENINO');

export function generoTypeFactory(code: GeneroCode): GeneroType {
  switch (code) {
    case 1:
      return MASCULINO;
    case 2:
      return FEMENINO;
    default:
      throw new Error('No existe genero con este codigo');
  }
}

export const GENERO = { MASCULINO, FEMENINO };

export const GENERO_VALUES = Object.values(GENERO);
