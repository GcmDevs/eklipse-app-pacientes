import {
  Activity,
  MoonStar,
  Thermometer,
  Waves,
} from 'lucide-react'
import type { ReactNode } from 'react'
import type { QuickAccess } from '@/types/symptoms'

type QuickAccessCardProps = {
  item: QuickAccess
  onSelect: () => void
}

export function QuickAccessCard({ item, onSelect }: QuickAccessCardProps) {
  return (
    <button
      type="button"
      className="quick-access-card"
      onClick={onSelect}
      aria-label={item.label}
    >
      <span className="quick-access-icon" aria-hidden="true">
        {getQuickIcon(item.icon)}
      </span>
      <span className="quick-access-label">{item.label}</span>
    </button>
  )
}

function getQuickIcon(kind: string): ReactNode {
  if (kind === 'burst') return <Activity size={22} strokeWidth={2.1} />
  if (kind === 'swirl') return <Waves size={22} strokeWidth={2.1} />
  if (kind === 'wave') return <MoonStar size={22} strokeWidth={2.1} />
  return <Thermometer size={22} strokeWidth={2.1} />
}
