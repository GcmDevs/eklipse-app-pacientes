import { LoginForm } from '@/components/auth/LoginForm'

export function LoginPage() {
  return (
    <main className="auth-layout">
      <section className="auth-panel auth-copy-panel">
        <div className="brand-mark" aria-hidden="true">
          E
        </div>
        <div className="auth-copy">
          <p className="eyebrow">Eklipse Paciente</p>
          <h1>Acompanamiento y seguimiento en salud</h1>
          <p className="auth-description">
            Un espacio pensado para mantener tu informacion cercana, clara y
            protegida en cada etapa de tu proceso.
          </p>
          <ul className="auth-highlights" aria-label="Beneficios principales">
            <li>Acceso sencillo y seguro a tu espacio personal.</li>
            <li>Informacion importante presentada con claridad.</li>
            <li>Base preparada para pacientes y administradores.</li>
          </ul>
        </div>
      </section>

      <section className="auth-panel auth-form-panel">
        <LoginForm />
      </section>
    </main>
  )
}
