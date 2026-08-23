import { _PrivSecEkUserOrm } from '@common/infrastructure/orm/pacient-as-user.orm';
import { ESTADOS_USUARIO } from '@gen/security/domain/types/gen/usuarios';
import { cryptoServices as crypto } from '@common/application/services';
import { _PrivSecPatientOrm } from '@common/infrastructure/orm/pacient.orm';

export const dataToUsuExtOrm = async (paciente: _PrivSecPatientOrm) => {
  const pacAsUser = new _PrivSecEkUserOrm();
  pacAsUser.document = paciente.document;
  pacAsUser.fullName = paciente.fullName;
  pacAsUser.password = await crypto.encrypt('123');
  pacAsUser.statusCode = ESTADOS_USUARIO.ACTIVO.getCode();
  pacAsUser.passwordIsReset = true;
  pacAsUser.pacientId = paciente.id;
  return pacAsUser;
};
