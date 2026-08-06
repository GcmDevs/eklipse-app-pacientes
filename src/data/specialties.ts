import type { SpecialtyDefinition, SpecialtyId } from '@/types/specialty'

export const specialties: SpecialtyDefinition[] = [
  {
    id: 'oncologia',
    label: 'Oncologia',
    description: 'Pacientes que requieren seguimiento oncologico.',
  },
  {
    id: 'cardiologia',
    label: 'Cardiologia',
    description: 'Pacientes en acompanamiento cardiovascular.',
  },
  {
    id: 'nutricion',
    label: 'Nutricion',
    description: 'Pacientes con plan de alimentacion y bienestar nutricional.',
  },
  {
    id: 'bienestar',
    label: 'Bienestar integral',
    description: 'Pacientes con foco en apoyo emocional y autocuidado.',
  },
]

export function getSpecialtyLabel(specialtyId: SpecialtyId) {
  return specialties.find((specialty) => specialty.id === specialtyId)?.label ?? specialtyId
}
