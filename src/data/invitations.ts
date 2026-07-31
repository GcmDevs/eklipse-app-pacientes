import type { Invitation } from '@/types/invitation'

export const invitations: Invitation[] = [
  {
    id: 'invitation-1',
    title: 'Charla de bienestar emocional',
    description:
      'Un encuentro pensado para compartir herramientas de acompanamiento emocional durante el tratamiento.',
    status: 'upcoming',
    date: '5 de agosto de 2026',
    time: '3:00 p. m.',
    endTime: '4:30 p. m.',
    locationLabel: 'Lugar',
    locationValue: 'Sala de bienestar - Eklipse',
    organizer: 'Equipo de acompanamiento',
    accent: 'teal',
  },
  {
    id: 'invitation-2',
    title: 'Taller de nutricion saludable',
    description:
      'Recomendaciones practicas para acompanar tu alimentacion con mayor claridad y tranquilidad.',
    status: 'upcoming',
    date: '12 de agosto de 2026',
    time: '10:00 a. m.',
    endTime: '11:30 a. m.',
    locationLabel: 'Lugar',
    locationValue: 'Sala multiproposito',
    organizer: 'Nutricion clinica',
    accent: 'purple',
  },
  {
    id: 'invitation-3',
    title: 'Grupo de apoyo',
    description:
      'Un espacio para conversar y compartir herramientas practicas junto a otras personas del proceso.',
    status: 'upcoming',
    date: '20 de agosto de 2026',
    time: '4:00 p. m.',
    endTime: '5:00 p. m.',
    locationLabel: 'Lugar',
    locationValue: 'Sala comunitaria',
    organizer: 'Psicooncologia',
    accent: 'amber',
  },
  {
    id: 'invitation-4',
    title: 'Mindfulness y meditacion',
    description:
      'Practicas guiadas para bajar tension, respirar con calma y fortalecer bienestar emocional.',
    status: 'upcoming',
    date: '28 de agosto de 2026',
    time: '5:00 p. m.',
    endTime: '6:00 p. m.',
    locationLabel: 'Lugar',
    locationValue: 'Salon de bienestar',
    organizer: 'Programa de bienestar',
    accent: 'rose',
  },
  {
    id: 'invitation-5',
    title: 'Encuentro de bienvenida',
    description:
      'Sesion inicial para conocer rutas de apoyo, canales de contacto y recursos del programa.',
    status: 'past',
    date: '24 de julio de 2026',
    time: '2:00 p. m.',
    endTime: '3:00 p. m.',
    locationLabel: 'Lugar',
    locationValue: 'Auditorio principal',
    organizer: 'Orientacion al paciente',
    accent: 'teal',
  },
]
