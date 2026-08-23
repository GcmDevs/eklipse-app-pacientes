import type { SeverityOption } from '@/types/symptoms'

type SeveritySelectorProps = {
  symptomName: string
  options: SeverityOption[]
  selectedId: string | null
  onSelect: (optionId: string) => void
  onBack: () => void
}

export function SeveritySelector({
  symptomName,
  options,
  selectedId,
  onSelect,
  onBack,
}: SeveritySelectorProps) {
  return (
    <section className="symptom-step-card">
      <button type="button" className="text-link step-back-link" onClick={onBack}>
        Volver
      </button>
      <div className="section-heading">
        <h2>{symptomName}</h2>
        <p>Que tan intenso es?</p>
      </div>
      <div className="severity-options-list" role="radiogroup" aria-label="Intensidad del sintoma">
        {options.map((option) => {
          const selected = selectedId === option.id

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              className={
                selected
                  ? 'severity-option-card severity-option-card-selected'
                  : 'severity-option-card'
              }
              onClick={() => onSelect(option.id)}
            >
              <span className="severity-mark" aria-hidden="true">
                {selected ? '●' : '○'}
              </span>
              <span>{option.label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
