import type { LucideIcon } from 'lucide-react'
import {
  BatteryLow,
  CircleAlert,
  Flower2,
  Frown,
  Smile,
  Sparkles,
} from 'lucide-react'
import type { MoodValue } from '@/types/mood'

export type MoodOption = {
  value: MoodValue
  icon: LucideIcon
  helper: string
  iconColor: string
  iconBackground: string
}

export const moodOptions: MoodOption[] = [
  {
    value: 'Tranquilo(a)',
    icon: Flower2,
    helper: 'Te sientes en calma en este momento.',
    iconColor: '#17836f',
    iconBackground: '#ddf6ef',
  },
  {
    value: 'Alegre',
    icon: Sparkles,
    helper: 'Hoy notas un animo mas ligero o positivo.',
    iconColor: '#d68120',
    iconBackground: '#fff1da',
  },
  {
    value: 'Preocupado(a)',
    icon: CircleAlert,
    helper: 'Hay algo que te genera inquietud o tension.',
    iconColor: '#a15a1c',
    iconBackground: '#ffe8d2',
  },
  {
    value: 'Triste',
    icon: Frown,
    helper: 'Te sientes con menos energia emocional.',
    iconColor: '#4e6fb0',
    iconBackground: '#e4ecff',
  },
  {
    value: 'Cansado(a)',
    icon: BatteryLow,
    helper: 'Tu cuerpo o tu mente se sienten agotados.',
    iconColor: '#7356b7',
    iconBackground: '#efe6ff',
  },
  {
    value: 'Desmotivado(a)',
    icon: Smile,
    helper: 'Hoy cuesta un poco mas encontrar impulso.',
    iconColor: '#8b6b55',
    iconBackground: '#f4e7de',
  },
]
