import { Link } from 'react-router-dom'

type SuccessScreenProps = {
  symptomName: string
  successMessage: string
  onManageAgain: () => void
}

export function SuccessScreen({
  symptomName,
  successMessage,
  onManageAgain,
}: SuccessScreenProps) {
  return (
    <section className="mood-feedback-card symptom-success-card">
      <p className="eyebrow">Registro completado</p>
      <h2>Gracias por registrar tu sintoma</h2>
      <p className="mood-feedback-text">
        Tu informacion ha sido guardada correctamente.
      </p>
      <div className="summary-check-list">
        <div>OK {symptomName}</div>
      </div>
      <p className="mood-support-copy">{successMessage}</p>
      <div className="feedback-actions">
        <button
          type="button"
          className="secondary-button mood-action-button"
          onClick={onManageAgain}
        >
          Gestionar sintomas
        </button>
        <Link to="/inicio" className="primary-button mood-action-button">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
