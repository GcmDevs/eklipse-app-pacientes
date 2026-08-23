export type SpecialtyId =
  | 'oncologia'
  | 'cardiologia'
  | 'nutricion'
  | 'bienestar'

export type SpecialtyDefinition = {
  id: SpecialtyId
  label: string
  description: string
}
