import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { MoodForm } from '@/components/mood/MoodForm'

export function MoodPage() {
  const navigate = useNavigate()

  return (
    <main className="page-shell mood-page mood-page-focus">
      <div className="mood-focus-topbar">
        <button
          type="button"
          className="mood-back-button"
          onClick={() => navigate('/inicio')}
          aria-label="Volver al inicio"
        >
          <ArrowLeft size={18} />
          <span>Volver</span>
        </button>
      </div>

      <section className="mood-header">
        <h2>Como te sientes hoy?</h2>
        <p>Selecciona la opcion que mejor represente como te sientes.</p>
      </section>

      <MoodForm />
    </main>
  )
}
