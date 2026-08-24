import type { MoodValue } from '@/types/mood';

export const moodMessages: Record<MoodValue, string> = {
  'Tranquilo(a)': 'Nos alegra saber como te encuentras hoy.',
  Alegre: 'Nos alegra saber como te encuentras hoy.',
  'Preocupado(a)': 'Gracias por compartirlo. Registrar como te sientes es importante.',
  Triste: 'Gracias por contarnos. No estas solo(a) durante este proceso.',
  'Cansado(a)': 'Recuerda escuchar a tu cuerpo y darte espacios para descansar.',
  'Desmotivado(a)': 'Gracias por compartirlo. Cada dia cuenta y estamos aqui para acompanarte.',
};
