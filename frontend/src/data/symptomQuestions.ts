import type { SymptomQuestion } from '@/types/symptoms';

export const symptomQuestions: Record<string, SymptomQuestion[]> = {
  cough: [
    {
      id: 'startedWhen',
      prompt: 'Cuando comenzo?',
      type: 'single-choice',
      options: [
        { value: 'today', label: 'Hoy', summaryLabel: 'Inicio hoy' },
        {
          value: 'few-days',
          label: 'Hace algunos dias',
          summaryLabel: 'Inicio hace algunos dias',
        },
        {
          value: 'over-week',
          label: 'Hace mas de una semana',
          summaryLabel: 'Inicio hace mas de una semana',
        },
      ],
    },
    {
      id: 'worse',
      prompt: 'Ha empeorado?',
      type: 'single-choice',
      options: [
        { value: 'yes', label: 'Si', summaryLabel: 'Ha empeorado' },
        { value: 'no', label: 'No', summaryLabel: 'No ha empeorado' },
      ],
    },
    {
      id: 'medication',
      prompt: 'Ha tomado algun medicamento?',
      type: 'single-choice',
      options: [
        { value: 'yes', label: 'Si', summaryLabel: 'Ha tomado medicamento' },
        { value: 'no', label: 'No', summaryLabel: 'No ha tomado medicamento' },
      ],
    },
  ],
  nausea: [
    {
      id: 'startedWhen',
      prompt: 'Cuando comenzo?',
      type: 'single-choice',
      options: [
        { value: 'today', label: 'Hoy', summaryLabel: 'Inicio hoy' },
        {
          value: 'few-days',
          label: 'Hace algunos dias',
          summaryLabel: 'Inicio hace algunos dias',
        },
        {
          value: 'over-week',
          label: 'Hace mas de una semana',
          summaryLabel: 'Inicio hace mas de una semana',
        },
      ],
    },
    {
      id: 'eating',
      prompt: 'Aparece al comer o al oler alimentos?',
      type: 'single-choice',
      options: [
        {
          value: 'yes',
          label: 'Si',
          summaryLabel: 'Aparece con alimentos u olores',
        },
        {
          value: 'no',
          label: 'No',
          summaryLabel: 'No depende de alimentos u olores',
        },
      ],
    },
  ],
  fatigue: [
    {
      id: 'resting',
      prompt: 'Descansar te ayuda a sentirte mejor?',
      type: 'single-choice',
      options: [
        { value: 'yes', label: 'Si', summaryLabel: 'Descansar ayuda' },
        {
          value: 'no',
          label: 'No',
          summaryLabel: 'Descansar no ayuda mucho',
        },
      ],
    },
    {
      id: 'dailyTasks',
      prompt: 'Te cuesta mas hacer tus actividades hoy?',
      type: 'single-choice',
      options: [
        {
          value: 'yes',
          label: 'Si',
          summaryLabel: 'Cuesta mas hacer actividades',
        },
        {
          value: 'no',
          label: 'No',
          summaryLabel: 'No afecta mucho mis actividades',
        },
      ],
    },
  ],
  fever: [
    {
      id: 'temperatureTaken',
      prompt: 'Te has tomado la temperatura?',
      type: 'single-choice',
      options: [
        {
          value: 'yes',
          label: 'Si',
          summaryLabel: 'Ya se tomo la temperatura',
        },
        {
          value: 'no',
          label: 'No',
          summaryLabel: 'Aun no se toma la temperatura',
        },
      ],
    },
    {
      id: 'startedWhen',
      prompt: 'Cuando lo notaste por primera vez?',
      type: 'single-choice',
      options: [
        { value: 'today', label: 'Hoy', summaryLabel: 'Inicio hoy' },
        {
          value: 'few-days',
          label: 'Hace algunos dias',
          summaryLabel: 'Inicio hace algunos dias',
        },
        {
          value: 'over-week',
          label: 'Hace mas de una semana',
          summaryLabel: 'Inicio hace mas de una semana',
        },
      ],
    },
  ],
  pain: [
    {
      id: 'startedWhen',
      prompt: 'Cuando comenzo?',
      type: 'single-choice',
      options: [
        { value: 'today', label: 'Hoy', summaryLabel: 'Inicio hoy' },
        {
          value: 'few-days',
          label: 'Hace algunos dias',
          summaryLabel: 'Inicio hace algunos dias',
        },
        {
          value: 'over-week',
          label: 'Hace mas de una semana',
          summaryLabel: 'Inicio hace mas de una semana',
        },
      ],
    },
    {
      id: 'constant',
      prompt: 'La molestia es constante?',
      type: 'single-choice',
      options: [
        { value: 'yes', label: 'Si', summaryLabel: 'Es constante' },
        { value: 'no', label: 'No', summaryLabel: 'No es constante' },
      ],
    },
  ],
};
