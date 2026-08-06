import {
  Activity,
  CircleEllipsis,
  ClipboardList,
  HeartHandshake,
  MoonStar,
  Pill,
} from 'lucide-react'

type InfluenceOptionCardProps = {
  label: string
  selected: boolean
  onSelect: () => void
}

export function InfluenceOptionCard({
  label,
  selected,
  onSelect,
}: InfluenceOptionCardProps) {
  return (
    <button
      type="button"
      className={
        selected
          ? 'influence-option influence-option-selected'
          : 'influence-option'
      }
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className="mood-option-check influence-option-check" aria-hidden="true">
        {selected ? <span className="selection-dot" /> : null}
      </span>
      <span className={`influence-option-icon influence-option-icon-${resolveInfluenceTone(label)}`} aria-hidden="true">
        {renderInfluenceIcon(label)}
      </span>
      <span className="influence-option-title">{label}</span>
      <span className="selection-indicator selection-indicator-compact" aria-hidden="true">
        {selected ? 'Activo' : 'Disponible'}
      </span>
    </button>
  )
}

function renderInfluenceIcon(label: string) {
  if (label === 'Dolor fisico') return <Activity size={18} />
  if (label === 'Cansancio') return <MoonStar size={18} />
  if (label === 'Preocupacion por resultados') return <ClipboardList size={18} />
  if (label === 'Familia o red de apoyo') return <HeartHandshake size={18} />
  if (label === 'Efectos del tratamiento') return <Pill size={18} />
  return <CircleEllipsis size={18} />
}

function resolveInfluenceTone(label: string) {
  if (label === 'Dolor fisico') return 'teal'
  if (label === 'Cansancio') return 'purple'
  if (label === 'Preocupacion por resultados') return 'amber'
  if (label === 'Familia o red de apoyo') return 'rose'
  if (label === 'Efectos del tratamiento') return 'blue'
  return 'slate'
}
