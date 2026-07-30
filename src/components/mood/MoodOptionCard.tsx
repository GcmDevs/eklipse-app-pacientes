import type { LucideIcon } from 'lucide-react'
import type { CSSProperties } from 'react'

type MoodOptionCardProps = {
  icon: LucideIcon
  label: string
  helper: string
  iconColor: string
  iconBackground: string
  selected: boolean
  onSelect: () => void
}

export function MoodOptionCard({
  icon: Icon,
  label,
  helper,
  iconColor,
  iconBackground,
  selected,
  onSelect,
}: MoodOptionCardProps) {
  return (
    <button
      type="button"
      className={selected ? 'mood-option mood-option-selected' : 'mood-option'}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <div
        className="mood-option-icon"
        style={
          {
            '--mood-icon-color': iconColor,
            '--mood-icon-bg': iconBackground,
          } as CSSProperties
        }
        aria-hidden="true"
      >
        <Icon size={22} />
      </div>
      <div className="mood-option-copy">
        <strong>{label}</strong>
        <span>{helper}</span>
      </div>
      <span className="selection-indicator" aria-hidden="true">
        {selected ? 'Seleccionado' : 'Seleccionar'}
      </span>
    </button>
  )
}
