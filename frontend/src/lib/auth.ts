import {
  findMockAccountByCredentials,
} from '@/data/mock-user'
import {
  defaultMockPatient,
  findMockPatientById,
} from '@/data/mockPatient'
import type { AuthSession, UserRole } from '@/types/auth'
import type { Patient } from '@/types/patient'

const AUTH_STORAGE_KEY = 'eklipse-auth-session'

type LoginPayload = {
  document: string
  password: string
  keepSignedIn: boolean
}

export function authenticateUser({
  document,
  password,
  keepSignedIn,
}: LoginPayload): AuthSession | null {
  const account = findMockAccountByCredentials(document, password)

  if (!account) {
    return null
  }

  return {
    user: account.user,
    keepSignedIn,
  }
}

export function saveAuthSession(session: AuthSession) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
}

export function getAuthSession(): AuthSession | null {
  const storedSession = localStorage.getItem(AUTH_STORAGE_KEY)

  if (!storedSession) {
    return null
  }

  try {
    return JSON.parse(storedSession) as AuthSession
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function isAuthenticated() {
  return getAuthSession() !== null
}

export function getCurrentUserRole(): UserRole | null {
  return getAuthSession()?.user.role ?? null
}

export function isAdminSession() {
  return getCurrentUserRole() === 'admin'
}

export function isPatientSession() {
  return getCurrentUserRole() === 'patient'
}

export function getDefaultRouteForRole(role: UserRole | null) {
  return role === 'admin' ? '/admin/inicio' : '/inicio'
}

export function getCurrentPatient(): Patient {
  const session = getAuthSession()

  if (!session || !session.user.patientId) {
    return defaultMockPatient
  }

  return findMockPatientById(session.user.patientId) ?? defaultMockPatient
}
