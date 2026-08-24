import { CtmType } from '@common/domain/types';

export type FactorEstadoAnimoCode = 1 | 2 | 3 | 4 | 5 | 6;

export class FactorEstadoAnimoType extends CtmType<FactorEstadoAnimoCode> {}

const DOLOR_FISICO = new FactorEstadoAnimoType(1, 'DOLOR FISICO');
const CANSANCIO = new FactorEstadoAnimoType(2, 'CANSANCIO');
const PREOCUPACION_POR_RESULTADOS = new FactorEstadoAnimoType(3, 'PREOCUPACION POR RESULTADOS');
const FAMILIA_RED_APOYO = new FactorEstadoAnimoType(4, 'FAMILIA O RED DE APOYO');
const EFECTOS_TRATAMIENTO = new FactorEstadoAnimoType(5, 'EFECTOS DEL TRATAMIENTO');
const OTRO = new FactorEstadoAnimoType(6, 'OTRO');

export function factorEstadoAnimoTypeFactory(code: FactorEstadoAnimoCode): FactorEstadoAnimoType {
  switch (code) {
    case 1:
      return DOLOR_FISICO;
    case 2:
      return CANSANCIO;
    case 3:
      return PREOCUPACION_POR_RESULTADOS;
    case 4:
      return FAMILIA_RED_APOYO;
    case 5:
      return EFECTOS_TRATAMIENTO;
    case 6:
      return OTRO;
    default:
      throw new Error('No existe factor de estado de animo con este codigo');
  }
}

export const FACTOR_ESTADO_ANIMO = {
  DOLOR_FISICO,
  CANSANCIO,
  PREOCUPACION_POR_RESULTADOS,
  FAMILIA_RED_APOYO,
  EFECTOS_TRATAMIENTO,
  OTRO,
};

export const FACTOR_ESTADO_ANIMO_VALUES = Object.values(FACTOR_ESTADO_ANIMO);
