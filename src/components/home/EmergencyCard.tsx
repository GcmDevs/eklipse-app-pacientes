import { PhoneCall, ShieldAlert } from 'lucide-react'

export function EmergencyCard() {
  return (
    <section className="emergency-card" aria-labelledby="emergency-title">
      <div className="emergency-card-copy">
        <div className="card-icon emergency-icon">
          <ShieldAlert size={20} aria-hidden="true" />
        </div>
        <div>
          <p className="eyebrow">Atencion inmediata</p>
          <h3 id="emergency-title">Necesitas atencion inmediata?</h3>
          <p>
            Si tienes una emergencia o presentas sintomas graves, comunicate
            con las lineas de atencion o acude al servicio de urgencias.
          </p>
        </div>
      </div>
      <button type="button" className="secondary-button">
        <PhoneCall size={18} aria-hidden="true" />
        Ver lineas de atencion
      </button>
    </section>
  )
}
