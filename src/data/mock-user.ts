import type { AuthUser } from '@/types/auth'
import { findMockPatientByDocument } from './mockPatient'

type MockAuthAccount = {
  document: string
  password: string
  user: AuthUser
}

export const mockAuthAccounts: MockAuthAccount[] = [
  createMockAccount('123456789', '123456789', 'female'),
  createMockAccount('987654321', '987654321', 'male'),
]

export function findMockAccountByCredentials(document: string, password: string) {
  return (
    mockAuthAccounts.find(
      (account) =>
        account.document === document && account.password === password,
    ) ?? null
  )
}

function createMockAccount(
  document: string,
  password: string,
  avatarVariant: 'male' | 'female',
): MockAuthAccount {
  const patient = findMockPatientByDocument(document)

  if (!patient) {
    throw new Error(`No patient found for document ${document}`)
  }

  return {
    document,
    password,
    user: {
      id: patient.id,
      patientId: patient.id,
      document,
      name: patient.shortName,
      initials: patient.initials,
      avatarVariant,
    },
  }
}
