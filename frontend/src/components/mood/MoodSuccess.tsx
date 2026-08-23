import { Link } from 'react-router-dom'

type MoodSuccessProps = {
  mood: string
  influence: string
  createdAt: string
  message: string
}

export function MoodSuccess({
  mood,
  influence,
  createdAt,
  message,
}: MoodSuccessProps) {
  return (
    <section className="mood-feedback-card">
      <p className="eyebrow">Registro guardado</p>
      <h2>Gracias por contarnos como te sientes</h2>
      <p className="mood-feedback-text">
        Tu registro fue guardado correctamente.
      </p>

      <dl className="mood-summary-list mood-summary-list-compact">
        <div>
          <dt>Estado de animo registrado</dt>
          <dd>{mood}</dd>
        </div>
        <div>
          <dt>Motivo seleccionado</dt>
          <dd>{influence}</dd>
        </div>
        <div>
          <dt>Fecha y hora</dt>
          <dd>{formatDateTime(createdAt)}</dd>
        </div>
      </dl>

      <p className="mood-support-copy">{message}</p>

      <div className="feedback-actions">
        <Link to="/inicio" className="primary-button mood-action-button">
          Volver al inicio
        </Link>
        <Link to="/historial" className="secondary-button mood-action-button">
          Ir a mi historial
        </Link>
      </div>
    </section>
  )
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(value))
}
