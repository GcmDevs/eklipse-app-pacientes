import { CalendarDays, ShieldCheck, UserRound } from 'lucide-react'
import { getAuthSession } from '@/lib/auth'

export function AdminProfilePage() {
  const session = getAuthSession()

  return (
    <main className="page-shell admin-page">
      <section className="admin-profile-hero">
        <div className="profile-avatar profile-avatar-redesign">{session?.user.initials ?? 'EA'}</div>
        <div>
          <p className="eyebrow">Perfil administrador</p>
          <h2>{session?.user.name ?? 'Administrador Eklipse'}</h2>
          <p>Gestiona invitaciones, monitorea registros y coordina seguimiento por especialidad.</p>
        </div>
      </section>

      <section className="admin-grid">
        <section className="admin-panel">
          <header className="admin-panel-header">
            <div>
              <h3>Acceso actual</h3>
              <p>Permisos operativos disponibles para esta cuenta.</p>
            </div>
          </header>
          <div className="admin-stat-list">
            <div className="admin-stat-row">
              <span className="admin-stat-label"><UserRound size={16} /> Rol</span>
              <strong>Administrador</strong>
            </div>
            <div className="admin-stat-row">
              <span className="admin-stat-label"><CalendarDays size={16} /> Modulos</span>
              <strong>Pacientes, invitaciones, panel clinico</strong>
            </div>
            <div className="admin-stat-row">
              <span className="admin-stat-label"><ShieldCheck size={16} /> Seguridad</span>
              <strong>Sesion protegida localmente</strong>
            </div>
          </div>
        </section>

        <section className="admin-panel">
          <header className="admin-panel-header">
            <div>
              <h3>Buenas practicas</h3>
              <p>Referencias utiles para esta primera fase del modulo admin.</p>
            </div>
          </header>
          <div className="admin-help-list">
            <article className="admin-help-row">
              <strong>Publica solo cuando la segmentacion este lista</strong>
              <span>Las invitaciones en borrador no se muestran a pacientes.</span>
            </article>
            <article className="admin-help-row">
              <strong>Revisa primero senales de atencion</strong>
              <span>La severidad reportada y la falta de actividad ayudan a priorizar.</span>
            </article>
          </div>
        </section>
      </section>
    </main>
  )
}
