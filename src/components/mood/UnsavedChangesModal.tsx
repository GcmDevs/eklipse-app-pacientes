type UnsavedChangesModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function UnsavedChangesModal({
  open,
  onClose,
  onConfirm,
}: UnsavedChangesModalProps) {
  if (!open) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="unsaved-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="eyebrow">Cancelar registro</p>
        <h2 id="unsaved-modal-title">Hay datos sin guardar</h2>
        <p className="mood-feedback-text">
          Si cancelas ahora, perderas la informacion que has escrito en este
          formulario.
        </p>
        <div className="feedback-actions">
          <button type="button" className="secondary-button mood-action-button" onClick={onClose}>
            Seguir editando
          </button>
          <button type="button" className="primary-button mood-action-button" onClick={onConfirm}>
            Limpiar formulario
          </button>
        </div>
      </div>
    </div>
  )
}
