export type AuthUser = {
  id: string
  patientId: string
  document: string
  name: string
  initials: string
  avatarVariant: 'male' | 'female'
}

export type AuthSession = {
  user: AuthUser
  keepSignedIn: boolean
}
