type SummaryCardProps = {
  symptomName: string
  severityLabel: string
  answerSummaries: string[]
  onBack: () => void
  onConfirm: () => void
}

export function SummaryCard({
  symptomName,
  severityLabel,
  answerSummaries,
  onBack,
  onConfirm,
}: SummaryCardProps) {
  return (
    <section className="symptom-step-card">
      <button type="button" className="text-link step-back-link" onClick={onBack}>
        Volver
      </button>
      <div className="section-heading">
        <h2>Vas a registrar</h2>
        <p>Revisa este resumen antes de continuar con {symptomName}.</p>
      </div>

      <div className="summary-check-list">
        <div>✓ {severityLabel}</div>
        {answerSummaries.map((summary) => (
          <div key={summary}>✓ {summary}</div>
        ))}
      </div>

      <div className="feedback-actions">
        <button type="button" className="primary-button mood-action-button" onClick={onConfirm}>
          Registrar
        </button>
        <button type="button" className="secondary-button mood-action-button" onClick={onBack}>
          Ajustar respuestas
        </button>
      </div>
    </section>
  )
}
