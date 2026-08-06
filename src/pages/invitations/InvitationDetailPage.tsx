import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Heart,
  MapPin,
  Share2,
  UsersRound,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import {
  getInvitationDateLabel,
  getInvitationTimeLabel,
  getVisibleInvitationsForCurrentUser,
} from '@/lib/invitations'

export function InvitationDetailPage() {
  const { invitationId } = useParams()
  const visibleInvitations = getVisibleInvitationsForCurrentUser()
  const invitation = visibleInvitations.find((entry) => entry.id === invitationId) ?? null

  if (!invitation) {
    return (
      <main className="page-shell invitation-page invitation-detail-page">
        <section className="invitation-shell">
          <article className="admin-empty-state">
            <strong>Esta invitacion no esta disponible para tu especialidad.</strong>
            <Link to="/invitaciones" className="text-link">
              Volver a invitaciones
            </Link>
          </article>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell invitation-page invitation-detail-page">
      <section className="invitation-shell invitation-detail-shell">
        <header className="invitation-topbar">
          <Link
            to="/invitaciones"
            className="invitation-back-link"
            aria-label="Volver a invitaciones"
          >
            <ArrowLeft size={18} />
          </Link>
          <div />
          <button
            type="button"
            className="icon-button invitation-filter-button"
            aria-label="Compartir invitacion"
          >
            <Share2 size={18} />
          </button>
        </header>

        <section className={`invitation-detail-hero invitation-detail-hero-${invitation.accent}`}>
          <div className="invitation-detail-hero-art" aria-hidden="true">
            <div className="invitation-detail-heart-wrap">
              <Heart size={28} />
            </div>
          </div>
          <div className="invitation-detail-hero-copy">
            <h1>{invitation.title}</h1>
            <p>{invitation.description}</p>
          </div>
        </section>

        <section className="invitation-detail-card">
          <dl className="invitation-detail-list">
            <div>
              <dt>
                <CalendarDays size={16} />
                Fecha
              </dt>
              <dd>{getInvitationDateLabel(invitation)}</dd>
            </div>
            <div>
              <dt>
                <Clock3 size={16} />
                Hora
              </dt>
              <dd>{getInvitationTimeLabel(invitation)}</dd>
            </div>
            <div>
              <dt>
                <MapPin size={16} />
                {invitation.locationLabel}
              </dt>
              <dd>{invitation.locationValue}</dd>
            </div>
            <div>
              <dt>
                <UsersRound size={16} />
                Organiza
              </dt>
              <dd>{invitation.organizer}</dd>
            </div>
          </dl>

          <div className="invitation-detail-actions">
            <button type="button" className="primary-button invitation-detail-primary">
              Confirmar asistencia
            </button>
            <button type="button" className="ghost-button invitation-detail-secondary">
              Agregar a mi calendario
            </button>
          </div>
        </section>
      </section>
    </main>
  )
}
