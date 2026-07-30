import type { BodyRegion } from '@/types/symptoms'

type BodyRegionCardProps = {
  region: BodyRegion
  selected: boolean
  onSelect: () => void
}

export function BodyRegionCard({
  region,
  selected,
  onSelect,
}: BodyRegionCardProps) {
  return (
    <button
      type="button"
      className={
        selected
          ? 'symptom-region-card symptom-region-card-selected'
          : 'symptom-region-card'
      }
      aria-pressed={selected}
      onClick={onSelect}
    >
      <strong>{region.label}</strong>
      <span>{region.description}</span>
    </button>
  )
}
