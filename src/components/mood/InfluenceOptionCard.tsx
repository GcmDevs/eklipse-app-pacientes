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
      <span className="influence-option-title">{label}</span>
      <span className="selection-indicator" aria-hidden="true">
        {selected ? 'Seleccionado' : 'Seleccionar'}
      </span>
    </button>
  )
}
