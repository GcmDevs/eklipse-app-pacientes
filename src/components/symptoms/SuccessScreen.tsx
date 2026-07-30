import { Link } from 'react-router-dom'

type SuccessScreenProps = {
  symptomName: string
  successMessage: string
}

export function SuccessScreen({
  symptomName,
  successMessage,
}: SuccessScreenProps) {
  return (
    <section className="mood-feedback-card symptom-success-card">
      <p className="eyebrow">Registro completado</p>
      <h2>Gracias por registrar tu sintoma</h2>
      <p className="mood-feedback-text">
        Tu informacion ha sido guardada correctamente.
      </p>
      <div className="summary-check-list">
        <div>✓ {symptomName}</div>
      </div>
      <p className="mood-support-copy">{successMessage}</p>
      <Link to="/inicio" className="primary-button mood-action-button">
        Volver al inicio
      </Link>
    </section>
  )
}
