export type UserRole = 'patient' | 'admin'

export type AuthUser = {
  id: string
  role: UserRole
  patientId: string | null
  document: string
  name: string
  initials: string
  avatarVariant: 'male' | 'female'
}

export type AuthSession = {
  user: AuthUser
  keepSignedIn: boolean
  token: string
  passwordIsReset: boolean
}
