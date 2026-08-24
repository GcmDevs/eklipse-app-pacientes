import { IntensidadSintomaOrm } from './intensidad-sintoma.orm';
import { RegistroEstadoAnimoOrm } from './registro-estado-animo.orm';
import { SintomaOrm } from './sintoma.orm';

export * from './intensidad-sintoma.orm';
export * from './registro-estado-animo.orm';
export * from './sintoma.orm';

export const ORM_GENERAL_ENTITIES = [
  IntensidadSintomaOrm,
  RegistroEstadoAnimoOrm,
  SintomaOrm,
];
