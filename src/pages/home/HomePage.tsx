import { announcements } from '@/data/announcements'
import { invitations } from '@/data/invitations'
import { getAuthSession } from '@/lib/auth'
import { InvitationCard } from '@/components/home/InvitationCard'
import { AnnouncementCard } from '@/components/home/AnnouncementCard'
import { EmergencyCard } from '@/components/home/EmergencyCard'

export function HomePage() {
  const session = getAuthSession()
  const userName = session?.user.name ?? 'Paciente'

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-card-copy">
          <p className="eyebrow">Bienestar y acompanamiento</p>
          <h2>Bienvenida, {userName}</h2>
          <p>
            Este espacio fue creado para acompanarte y mantenerte informada
            durante tu proceso.
          </p>
        </div>
        <div className="hero-card-aside">
          <span className="hero-note">Tu informacion se presenta con claridad</span>
          <span className="hero-note">Recibe avisos importantes en un solo lugar</span>
        </div>
      </section>

      <section className="home-summary-strip" aria-label="Resumen general">
        <article className="home-summary-item">
          <strong>{invitations.length}</strong>
          <span>Invitaciones activas</span>
        </article>
        <article className="home-summary-item">
          <strong>{announcements.length}</strong>
          <span>Anuncios recientes</span>
        </article>
        <article className="home-summary-item">
          <strong>24/7</strong>
          <span>Canales de apoyo</span>
        </article>
      </section>

      <section className="content-block">
        <div className="section-heading">
          <h3>Invitaciones para ti</h3>
          <p>Encuentros y actividades pensadas para acompanarte este mes.</p>
        </div>
        <div className="cards-grid cards-grid-large">
          {invitations.map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))}
        </div>
      </section>

      <section className="content-block">
        <div className="section-heading">
          <h3>Anuncios importantes</h3>
          <p>Informacion breve para ayudarte a preparar tu proxima atencion.</p>
        </div>
        <div className="cards-grid">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      </section>

      <EmergencyCard />
    </main>
  )
}
