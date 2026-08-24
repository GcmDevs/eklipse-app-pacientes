import { ORM_SECURITY_ENTITIES } from '@gen/security/infrastructure/orm';
import { ORM_GENERAL_ENTITIES } from '@gen/general/infrastructure/orm';

export const ENTITIES = [
  // --- AVOID NOWRAP --- //
  ...ORM_GENERAL_ENTITIES,
  ...ORM_SECURITY_ENTITIES,
];
