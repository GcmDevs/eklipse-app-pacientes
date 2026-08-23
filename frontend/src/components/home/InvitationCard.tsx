import { CalendarDays, Clock3, MapPin } from 'lucide-react'
import { getInvitationDateLabel, getInvitationTimeLabel } from '@/lib/invitations'
import type { Invitation } from '@/types/invitation'

type InvitationCardProps = {
  invitation: Invitation
}

export function InvitationCard({ invitation }: InvitationCardProps) {
  return (
    <article className="info-card invitation-card">
      <div className="card-icon">
        <CalendarDays size={20} aria-hidden="true" />
      </div>
      <div className="card-copy">
        <h4>{invitation.title}</h4>
        <p>{invitation.description}</p>
      </div>
      <dl className="detail-list">
        <div>
          <dt>
            <CalendarDays size={16} aria-hidden="true" />
            Fecha
          </dt>
          <dd>{getInvitationDateLabel(invitation)}</dd>
        </div>
        <div>
          <dt>
            <Clock3 size={16} aria-hidden="true" />
            Hora
          </dt>
          <dd>{getInvitationTimeLabel(invitation)}</dd>
        </div>
        <div>
          <dt>
            <MapPin size={16} aria-hidden="true" />
            {invitation.locationLabel}
          </dt>
          <dd>{invitation.locationValue}</dd>
        </div>
      </dl>
      <button type="button" className="ghost-button">
        Ver invitacion
      </button>
    </article>
  )
}
