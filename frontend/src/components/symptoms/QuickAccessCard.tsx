import {
  Activity,
  BatteryLow,
  Thermometer,
  Waves,
} from 'lucide-react'
import type { QuickAccess, QuickAccessCode } from '@/types/symptoms'

type QuickAccessCardProps = {
  item: QuickAccess
  disabled?: boolean
  onSelect: () => void
}

export function QuickAccessCard({
  item,
  disabled = false,
  onSelect,
}: QuickAccessCardProps) {
  return (
    <button
      type="button"
      className="quick-access-card"
      disabled={disabled}
      aria-label={`Acceso rapido: ${item.label}`}
      onClick={onSelect}
    >
      <span className="quick-access-icon" aria-hidden="true">
        {getQuickAccessIcon(item.code)}
      </span>
      <span className="quick-access-label">{item.label}</span>
    </button>
  )
}

function getQuickAccessIcon(code: QuickAccessCode) {
  if (code === 'DOLOR') return <Activity size={20} />
  if (code === 'NAUSEAS') return <Waves size={20} />
  if (code === 'FATIGA') return <BatteryLow size={20} />
  return <Thermometer size={20} />
}
