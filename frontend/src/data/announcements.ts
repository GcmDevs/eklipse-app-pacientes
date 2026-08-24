import type { Announcement } from '@/types/announcement';

export const announcements: Announcement[] = [
  {
    id: 'announcement-1',
    category: 'Atencion',
    title: 'Actualizacion de horarios',
    description:
      'Durante el mes de agosto tendremos nuevos horarios de atencion para algunos servicios.',
    publishedAt: 'Publicado el 30 de julio de 2026',
  },
  {
    id: 'announcement-2',
    category: 'Preparacion',
    title: 'Recomendacion para tu proxima visita',
    description: 'Recuerda llevar tus documentos y resultados recientes para agilizar tu atencion.',
    publishedAt: 'Publicado el 29 de julio de 2026',
  },
  {
    id: 'announcement-3',
    category: 'Contacto',
    title: 'Linea de atencion',
    description:
      'Consulta los canales disponibles para comunicarte con la institucion cuando lo necesites.',
    publishedAt: 'Publicado el 28 de julio de 2026',
  },
];
