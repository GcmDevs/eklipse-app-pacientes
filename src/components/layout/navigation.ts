import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  CircleHelp,
  History,
  House,
  Smile,
  UserRound,
} from 'lucide-react'

export type NavigationItem = {
  to: string
  label: string
  shortLabel: string
  title: string
  icon: LucideIcon
}

export const navigationItems: NavigationItem[] = [
  {
    to: '/inicio',
    label: 'Inicio',
    shortLabel: 'Inicio',
    title: 'Inicio',
    icon: House,
  },
  {
    to: '/estado-animo',
    label: 'Como me siento hoy?',
    shortLabel: 'Animo',
    title: 'Como me siento hoy?',
    icon: Smile,
  },
  {
    to: '/sintomas',
    label: 'Reportar sintomas',
    shortLabel: 'Sintomas',
    title: 'Reportar sintomas',
    icon: Activity,
  },
  {
    to: '/historial',
    label: 'Mi historial',
    shortLabel: 'Historial',
    title: 'Mi historial',
    icon: History,
  },
  {
    to: '/preguntas-frecuentes',
    label: 'Preguntas frecuentes',
    shortLabel: 'Ayuda',
    title: 'Preguntas frecuentes',
    icon: CircleHelp,
  },
  {
    to: '/perfil',
    label: 'Mi perfil',
    shortLabel: 'Perfil',
    title: 'Mi perfil',
    icon: UserRound,
  },
]

export function getPageTitle(pathname: string) {
  const item = navigationItems.find((entry) => entry.to === pathname)
  return item?.title ?? 'Ruta no encontrada'
}
