import type { Invitation } from '@/types/invitation'

export const invitations: Invitation[] = [
  {
    id: 'invitation-1',
    title: 'Charla de bienestar emocional',
    description:
      'Un encuentro pensado para compartir herramientas de acompanamiento emocional durante el tratamiento.',
    date: '5 de agosto de 2026',
    time: '3:00 p. m.',
    locationLabel: 'Lugar',
    locationValue: 'Auditorio principal',
  },
  {
    id: 'invitation-2',
    title: 'Taller de nutricion durante el tratamiento',
    description:
      'Recomendaciones practicas para acompanar tu alimentacion con mayor claridad y tranquilidad.',
    date: '12 de agosto de 2026',
    time: '9:00 a. m.',
    locationLabel: 'Modalidad',
    locationValue: 'Virtual',
  },
]
