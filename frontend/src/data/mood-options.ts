import type { MoodValue } from '@/types/mood';

export type MoodFaceId = 'calm' | 'happy' | 'worried' | 'sad' | 'tired' | 'unmotivated';

export type MoodOption = {
  value: MoodValue;
  face: MoodFaceId;
  helper: string;
};

export const moodOptions: MoodOption[] = [
  {
    value: 'Tranquilo(a)',
    face: 'calm',
    helper: 'Te sientes en calma en este momento.',
  },
  {
    value: 'Alegre',
    face: 'happy',
    helper: 'Hoy notas un animo mas ligero o positivo.',
  },
  {
    value: 'Preocupado(a)',
    face: 'worried',
    helper: 'Hay algo que te genera inquietud o tension.',
  },
  {
    value: 'Triste',
    face: 'sad',
    helper: 'Te sientes con menos energia emocional.',
  },
  {
    value: 'Cansado(a)',
    face: 'tired',
    helper: 'Tu cuerpo o tu mente se sienten agotados.',
  },
  {
    value: 'Desmotivado(a)',
    face: 'unmotivated',
    helper: 'Hoy cuesta un poco mas encontrar impulso.',
  },
];
