import { Link } from 'react-router-dom'
import type { MoodRecord } from '@/types/mood'

type ExistingMoodRecordProps = {
  record: MoodRecord
}

export function ExistingMoodRecord({ record }: ExistingMoodRecordProps) {
  return (
    <section className="mood-feedback-card">
      <p className="eyebrow">Registro del dia</p>
      <h2>Ya registraste como te sientes hoy</h2>
      <p className="mood-feedback-text">
        Por ahora solo permitimos un registro diario para mantener este
        seguimiento claro y sencillo.
      </p>

      <dl className="mood-summary-list mood-summary-list-compact">
        <div>
          <dt>Estado registrado</dt>
          <dd>{record.mood}</dd>
        </div>
        <div>
          <dt>Hora del registro</dt>
          <dd>{formatTime(record.createdAt)}</dd>
        </div>
      </dl>

      <Link to="/inicio" className="primary-button mood-action-button">
        Volver al inicio
      </Link>
    </section>
  )
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat('es-CO', {
    timeStyle: 'short',
  }).format(new Date(value))
}
