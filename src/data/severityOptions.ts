import type { SeverityOption } from '@/types/symptoms'

export const severityOptions: Record<string, SeverityOption[]> = {
  cough: [
    {
      id: 'cough-none',
      label: 'No tengo tos en este momento',
      summaryLabel: 'No tengo tos en este momento',
      severityLevel: 0,
    },
    {
      id: 'cough-occasional',
      label: 'Tengo tos ocasional',
      summaryLabel: 'Tos ocasional',
      severityLevel: 1,
    },
    {
      id: 'cough-frequent',
      label: 'Tengo tos frecuente',
      summaryLabel: 'Tos frecuente',
      severityLevel: 2,
    },
    {
      id: 'cough-strong',
      label: 'Tengo mucha tos',
      summaryLabel: 'Mucha tos',
      severityLevel: 3,
    },
    {
      id: 'cough-blood',
      label: 'Tengo tos con sangre',
      summaryLabel: 'Tos con sangre',
      severityLevel: 4,
    },
  ],
  breathing: [
    {
      id: 'breathing-light',
      label: 'La molestia es leve y puedo seguir mi rutina',
      summaryLabel: 'Molestia leve',
      severityLevel: 1,
    },
    {
      id: 'breathing-moderate',
      label: 'La molestia aparece varias veces en el dia',
      summaryLabel: 'Molestia varias veces al dia',
      severityLevel: 2,
    },
    {
      id: 'breathing-strong',
      label: 'La molestia me afecta bastante hoy',
      summaryLabel: 'Molestia fuerte',
      severityLevel: 3,
    },
  ],
  digestion: [
    {
      id: 'digestion-mild',
      label: 'Lo noto un poco, pero puedo seguir normal',
      summaryLabel: 'Molestia leve',
      severityLevel: 1,
    },
    {
      id: 'digestion-mid',
      label: 'Me incomoda varias veces en el dia',
      summaryLabel: 'Molestia repetida',
      severityLevel: 2,
    },
    {
      id: 'digestion-strong',
      label: 'Me afecta mucho hoy',
      summaryLabel: 'Molestia fuerte',
      severityLevel: 3,
    },
  ],
  fatigue: [
    {
      id: 'fatigue-light',
      label: 'Tengo un poco menos de energia de lo usual',
      summaryLabel: 'Un poco menos de energia',
      severityLevel: 1,
    },
    {
      id: 'fatigue-mid',
      label: 'Necesito descansar varias veces durante el dia',
      summaryLabel: 'Necesito descansar varias veces',
      severityLevel: 2,
    },
    {
      id: 'fatigue-strong',
      label: 'Me cuesta mucho hacer mis actividades hoy',
      summaryLabel: 'Mucha dificultad para mis actividades',
      severityLevel: 3,
    },
  ],
  fever: [
    {
      id: 'fever-suspect',
      label: 'Siento el cuerpo caliente o diferente a lo usual',
      summaryLabel: 'Siento el cuerpo caliente',
      severityLevel: 1,
    },
    {
      id: 'fever-measured',
      label: 'Ya me tome la temperatura y esta alta',
      summaryLabel: 'Temperatura alta medida',
      severityLevel: 2,
    },
    {
      id: 'fever-persistent',
      label: 'La sensacion no mejora o vuelve varias veces',
      summaryLabel: 'Sensacion persistente',
      severityLevel: 3,
    },
  ],
  default: [
    {
      id: 'default-light',
      label: 'Lo noto un poco en este momento',
      summaryLabel: 'Lo noto un poco',
      severityLevel: 1,
    },
    {
      id: 'default-mid',
      label: 'Me esta molestando varias veces hoy',
      summaryLabel: 'Me molesta varias veces hoy',
      severityLevel: 2,
    },
    {
      id: 'default-strong',
      label: 'Me esta afectando bastante hoy',
      summaryLabel: 'Me afecta bastante hoy',
      severityLevel: 3,
    },
  ],
}
