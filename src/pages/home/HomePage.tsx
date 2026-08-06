import { Bell, CalendarDays, ChevronRight, Headphones } from 'lucide-react'
import { Link } from 'react-router-dom'
import homePortraitWoman from '@/assets/home-portrait-female.png'
import homePortraitMan from '@/assets/home-portrait-male.png'
import { announcements } from '@/data/announcements'
import { getAuthSession } from '@/lib/auth'
import {
  getInvitationDateLabel,
  getInvitationTimingStatus,
  getUpcomingPublishedInvitationCountForCurrentUser,
  getVisibleInvitationsForCurrentUser,
} from '@/lib/invitations'

export function HomePage() {
  const session = getAuthSession()
  const userName = session?.user.name ?? 'Paciente'
  const avatarVariant = session?.user.avatarVariant ?? 'female'
  const heroImage = avatarVariant === 'male' ? homePortraitMan : homePortraitWoman
  const welcomeLabel = avatarVariant === 'male' ? 'Bienvenido' : 'Bienvenida'
  const visibleInvitations = getVisibleInvitationsForCurrentUser()
  const featuredInvitation =
    visibleInvitations.find(
      (invitation) =>
        invitation.status === 'published' &&
        getInvitationTimingStatus(invitation) === 'upcoming',
    ) ?? null

  return (
    <main className="page-shell home-dashboard">
      <section className="home-hero-panel">
        <div className="home-hero-copy">
          <p className="eyebrow">Bienestar y acompanamiento</p>
          <h2>{welcomeLabel}, {userName}!</h2>
          <p>
            Este espacio fue creado para acompanarte y mantener tu informacion clara
            durante tu proceso.
          </p>
        </div>

        <div className="home-hero-visual" aria-hidden="true">
          <img src={heroImage} alt="" className="home-hero-image" />
        </div>
      </section>

      <section className="home-summary-strip" aria-label="Resumen general">
        <article className="home-summary-item home-summary-item-teal">
          <span className="home-summary-icon" aria-hidden="true">
            <CalendarDays size={18} />
          </span>
          <strong>{getUpcomingPublishedInvitationCountForCurrentUser()}</strong>
          <span>Invitaciones activas</span>
        </article>
        <article className="home-summary-item home-summary-item-amber">
          <span className="home-summary-icon" aria-hidden="true">
            <Bell size={18} />
          </span>
          <strong>{announcements.length}</strong>
          <span>Anuncios recientes</span>
        </article>
        <article className="home-summary-item home-summary-item-blue">
          <span className="home-summary-icon" aria-hidden="true">
            <Headphones size={18} />
          </span>
          <strong>24/7</strong>
          <span>Canales de apoyo</span>
        </article>
      </section>

      <section className="content-block">
        <div className="section-heading">
          <h3>Invitaciones para ti</h3>
          <p>Encuentros y actividades pensadas para acompanarte este mes.</p>
        </div>
        {featuredInvitation ? (
          <Link
            to="/invitaciones"
            className="home-featured-invitation"
          >
            <div className="home-featured-icon" aria-hidden="true">
              <CalendarDays size={20} />
            </div>
            <div className="home-featured-copy">
              <strong>{featuredInvitation.title}</strong>
              <p>{featuredInvitation.description}</p>
              <span>Fecha: {getInvitationDateLabel(featuredInvitation)}</span>
            </div>
            <ChevronRight size={18} aria-hidden="true" />
          </Link>
        ) : (
          <article className="home-featured-invitation home-featured-invitation-empty">
            <div className="home-featured-icon" aria-hidden="true">
              <CalendarDays size={20} />
            </div>
            <div className="home-featured-copy">
              <strong>No hay invitaciones activas para tu especialidad</strong>
              <p>Cuando publiquemos una nueva actividad, la veras aqui.</p>
            </div>
          </article>
        )}
      </section>
    </main>
  )
}
