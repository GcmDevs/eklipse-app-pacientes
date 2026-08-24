import { CtmType } from '@common/domain/types';

export type RegionCorporalSintomaCode = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export class RegionCorporalSintomaType extends CtmType<RegionCorporalSintomaCode> {}

const SALUD_ORAL = new RegionCorporalSintomaType(1, 'SALUD ORAL');
const RESPIRACION = new RegionCorporalSintomaType(2, 'RESPIRACION');
const DIGESTIVO = new RegionCorporalSintomaType(3, 'DIGESTIVO');
const PROBLEMAS_URINARIOS = new RegionCorporalSintomaType(4, 'PROBLEMAS URINARIOS');
const PIEL = new RegionCorporalSintomaType(5, 'PIEL');

export function regionCorporalSintomaTypeFactory(
  code: RegionCorporalSintomaCode
): RegionCorporalSintomaType {
  switch (code) {
    case 1:
      return SALUD_ORAL;
    case 2:
      return RESPIRACION;
    case 3:
      return DIGESTIVO;
    case 4:
      return PROBLEMAS_URINARIOS;
    case 5:
      return PIEL;
    default:
      throw new Error('No existe region corporal de sintoma con este codigo');
  }
}

export const REGION_CORPORAL_SINTOMA = {
  SALUD_ORAL,
  RESPIRACION,
  DIGESTIVO,
  PROBLEMAS_URINARIOS,
  PIEL,
};

export const REGION_CORPORAL_SINTOMA_VALUES = Object.values(REGION_CORPORAL_SINTOMA);
