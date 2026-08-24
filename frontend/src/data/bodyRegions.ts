import type { BodyRegion, QuickAccess } from '@/types/symptoms';

export const bodyRegions: BodyRegion[] = [
  {
    id: 'oral',
    label: 'Salud oral',
    description: 'Boca, lengua, garganta y dificultad para comer o tragar.',
    bodyArea: 'head',
  },
  {
    id: 'respiratory',
    label: 'Respiracion',
    description: 'Molestias relacionadas con el pecho o el aire al respirar.',
    bodyArea: 'chest',
  },
  {
    id: 'digestive',
    label: 'Digestivo',
    description: 'Estomago, abdomen y cambios en digestion o evacuacion.',
    bodyArea: 'abdomen',
  },
  {
    id: 'urinary',
    label: 'Problemas urinarios',
    description: 'Molestias al orinar o cambios en la frecuencia.',
    bodyArea: 'pelvis',
  },
  {
    id: 'skin',
    label: 'Piel',
    description: 'Comezon, sarpullido, heridas o cambios visibles en la piel.',
    bodyArea: 'arms',
  },
];

export const quickAccesses: QuickAccess[] = [
  {
    id: 'pain',
    label: 'Dolor',
    description: 'Quiero registrar dolor sin buscar una zona primero.',
    icon: 'burst',
  },
  {
    id: 'nausea',
    label: 'Nauseas',
    description: 'Siento nausea o malestar relacionado con el estomago.',
    icon: 'swirl',
  },
  {
    id: 'fatigue',
    label: 'Fatiga',
    description: 'Me siento con menos energia de la habitual.',
    icon: 'wave',
  },
  {
    id: 'fever',
    label: 'Fiebre',
    description: 'Quiero registrar fiebre o sensacion de temperatura elevada.',
    icon: 'spark',
  },
];
