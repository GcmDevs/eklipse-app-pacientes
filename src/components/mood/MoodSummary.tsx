type MoodSummaryProps = {
  mood: string
  influence: string
  otherInfluence: string
  comment: string
}

export function MoodSummary({
  mood,
  influence,
  otherInfluence,
  comment,
}: MoodSummaryProps) {
  const resolvedInfluence =
    influence === 'Otro' && otherInfluence.trim()
      ? `${influence}: ${otherInfluence.trim()}`
      : influence

  return (
    <section className="mood-summary" aria-labelledby="mood-summary-title">
      <div className="section-heading">
        <h3 id="mood-summary-title">Resumen de tu registro</h3>
        <p>Revisa la informacion antes de guardarla.</p>
      </div>
      <dl className="mood-summary-list">
        <div>
          <dt>Estado de animo</dt>
          <dd>{mood}</dd>
        </div>
        <div>
          <dt>Motivo principal</dt>
          <dd>{resolvedInfluence}</dd>
        </div>
        {comment.trim() ? (
          <div>
            <dt>Comentario adicional</dt>
            <dd>{comment.trim()}</dd>
          </div>
        ) : null}
      </dl>
    </section>
  )
}
