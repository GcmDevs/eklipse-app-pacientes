import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Filter,
  HeartHandshake,
  Sparkles,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  getInvitationDateLabel,
  getInvitationTimeLabel,
  getInvitationTimingStatus,
  getVisibleInvitationsForCurrentUser,
} from '@/lib/invitations'

type InvitationTab = 'all' | 'upcoming' | 'past'

const tabs: Array<{ id: InvitationTab; label: string }> = [
  { id: 'all', label: 'Todas' },
  { id: 'upcoming', label: 'Proximas' },
  { id: 'past', label: 'Pasadas' },
]

export function InvitationsPage() {
  const [activeTab, setActiveTab] = useState<InvitationTab>('all')
  const invitations = getVisibleInvitationsForCurrentUser()

  const visibleInvitations = useMemo(() => {
    const orderedInvitations = [...invitations].sort((left, right) => {
      const leftStatus = getInvitationTimingStatus(left)
      const rightStatus = getInvitationTimingStatus(right)

      if (leftStatus === rightStatus) {
        return 0
      }

      return leftStatus === 'upcoming' ? -1 : 1
    })

    if (activeTab === 'all') {
      return orderedInvitations
    }

    return orderedInvitations.filter(
      (invitation) => getInvitationTimingStatus(invitation) === activeTab,
    )
  }, [activeTab, invitations])

  return (
    <main className="page-shell invitation-page">
      <section className="invitation-shell">
        <header className="invitation-topbar">
          <Link to="/inicio" className="invitation-back-link" aria-label="Volver al inicio">
            <ArrowLeft size={18} />
          </Link>
          <h1>Invitaciones</h1>
          <button
            type="button"
            className="icon-button invitation-filter-button"
            aria-label="Filtrar invitaciones"
          >
            <Filter size={18} />
          </button>
        </header>

        <nav className="invitation-tabs" aria-label="Filtros de invitaciones">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                className={isActive ? 'invitation-tab invitation-tab-active' : 'invitation-tab'}
                aria-pressed={isActive}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            )
          })}
        </nav>

        <section className="invitation-list">
          {visibleInvitations.map((invitation) => (
            <Link
              key={invitation.id}
              to={`/invitaciones/${invitation.id}`}
              className={`invitation-list-card invitation-list-card-${invitation.accent}`}
            >
              <div
                className={`invitation-list-icon invitation-list-icon-${invitation.accent}`}
                aria-hidden="true"
              >
                {getInvitationIcon(invitation.accent)}
              </div>

              <div className="invitation-list-copy">
                <strong>{invitation.title}</strong>
                <span>{`${getInvitationDateLabel(invitation)} - ${getInvitationTimeLabel(invitation)}`}</span>
              </div>

              <div className="invitation-list-end">
                {getInvitationTimingStatus(invitation) === 'upcoming' ? (
                  <span
                    className={`invitation-status-pill invitation-status-pill-${invitation.accent}`}
                  >
                    Proxima
                  </span>
                ) : (
                  <span className="invitation-status-pill invitation-status-pill-past">
                    Pasada
                  </span>
                )}
                <ChevronRight size={16} aria-hidden="true" />
              </div>
            </Link>
          ))}

          {visibleInvitations.length === 0 ? (
            <article className="admin-empty-state">
              <strong>No hay invitaciones disponibles para tu especialidad.</strong>
              <span>Tu equipo podra publicar nuevas actividades para ti mas adelante.</span>
            </article>
          ) : null}
        </section>
      </section>
    </main>
  )
}

function getInvitationIcon(accent: 'teal' | 'purple' | 'amber' | 'rose') {
  if (accent === 'purple') return <Users size={18} />
  if (accent === 'amber') return <HeartHandshake size={18} />
  if (accent === 'rose') return <Sparkles size={18} />
  return <CalendarDays size={18} />
}
