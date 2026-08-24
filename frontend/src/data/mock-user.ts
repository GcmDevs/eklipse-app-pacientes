import type { AuthUser } from '@/types/auth';
import { findMockPatientByDocument } from './mockPatient';

type MockAuthAccount = {
  document: string;
  password: string;
  user: AuthUser;
};

export const mockAuthAccounts: MockAuthAccount[] = [
  createMockPatientAccount('123456789', '123456789', 'female'),
  createMockPatientAccount('987654321', '987654321', 'male'),
  {
    document: '111111111',
    password: '111111111',
    user: {
      id: 'admin-daniela-001',
      role: 'admin',
      patientId: null,
      document: '111111111',
      name: 'Daniela Ruiz',
      initials: 'DR',
      avatarVariant: 'female',
    },
  },
];

export function findMockAccountByCredentials(document: string, password: string) {
  return (
    mockAuthAccounts.find(
      account => account.document === document && account.password === password
    ) ?? null
  );
}

function createMockPatientAccount(
  document: string,
  password: string,
  avatarVariant: 'male' | 'female'
): MockAuthAccount {
  const patient = findMockPatientByDocument(document);

  if (!patient) {
    throw new Error(`No patient found for document ${document}`);
  }

  return {
    document,
    password,
    user: {
      id: patient.id,
      role: 'patient',
      patientId: patient.id,
      document,
      name: patient.shortName,
      initials: patient.initials,
      avatarVariant,
    },
  };
}
