import { Circle, CircleDot } from 'lucide-react'
import type { SeverityOption } from '@/types/symptoms'

type SeveritySelectorProps = {
  symptomName: string
  options: SeverityOption[]
  selectedId: number | null
  onSelect: (optionId: number) => void
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
                {selected ? <CircleDot size={20} /> : <Circle size={20} />}
              </span>
              <span>{option.label}</span>
            </button>
          )
        })}
        {options.length === 0 ? (
          <div className="empty-search-state" role="status">
            <strong>No hay intensidades configuradas para este sintoma.</strong>
            <p>Vuelve a la lista y selecciona otro sintoma.</p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
