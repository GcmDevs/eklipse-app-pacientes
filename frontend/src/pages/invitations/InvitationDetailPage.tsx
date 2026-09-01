import { useEffect, useState } from 'react';
import { ArrowLeft, CalendarDays, Clock3, Heart, MapPin, Share2, UsersRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
  getEventAttendanceStatusLabel,
  getEventInvitationAccent,
  getEventInvitationDateLabel,
  getEventInvitationTimeLabel,
} from '@/lib/event-invitations';
import {
  getMyEventInvitations,
  onEventInvitationUpdated,
  respondToEventInvitation,
} from '@/lib/events';
import type { NewEventInvitation } from '@/types/event';

export function InvitationDetailPage() {
  const { invitationId } = useParams();
  const numericInvitationId = Number(invitationId);
  const [invitation, setInvitation] = useState<NewEventInvitation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isResponding, setIsResponding] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    let active = true;
    const unsubscribe = onEventInvitationUpdated(updatedInvitation => {
      if (active && updatedInvitation.invitationId === numericInvitationId) {
        setInvitation(updatedInvitation);
      }
    });

    if (Number.isSafeInteger(numericInvitationId) && numericInvitationId > 0) {
      getMyEventInvitations()
        .then(invitations => {
          if (active) {
            setInvitation(
              invitations.find(current => current.invitationId === numericInvitationId) ?? null
            );
          }
        })
        .catch(loadError => {
          if (active) {
            setError(
              loadError instanceof Error
                ? loadError.message
                : 'No fue posible consultar la invitación.'
            );
          }
        })
        .finally(() => {
          if (active) setIsLoading(false);
        });
    }

    return () => {
      active = false;
      unsubscribe();
    };
  }, [numericInvitationId]);

  const handleAttendance = async (status: 2 | 3) => {
    if (!invitation) return;
    setIsResponding(true);
    setError('');
    setFeedback('');

    try {
      const updatedInvitation = await respondToEventInvitation(invitation.invitationId, status);
      setInvitation(updatedInvitation);
      setFeedback(
        status === 2
          ? 'Confirmamos que asistirás al evento.'
          : 'Registramos que no asistirás al evento.'
      );
    } catch (responseError) {
      setError(
        responseError instanceof Error
          ? responseError.message
          : 'No fue posible guardar tu respuesta.'
      );
    } finally {
      setIsResponding(false);
    }
  };

  if (!Number.isSafeInteger(numericInvitationId) || numericInvitationId <= 0) {
    return <InvitationState message='El identificador de la invitación no es válido.' />;
  }

  if (isLoading) return <InvitationState message='Consultando la invitación...' />;

  if (!invitation) {
    return (
      <InvitationState
        message={error || 'Esta invitación no existe o no está asociada a tu usuario.'}
      />
    );
  }

  const accent = getEventInvitationAccent(invitation.invitationId);

  return (
    <main className='page-shell invitation-page invitation-detail-page'>
      <section className='invitation-shell invitation-detail-shell'>
        <header className='invitation-topbar'>
          <Link
            to='/invitaciones'
            className='invitation-back-link'
            aria-label='Volver a invitaciones'
          >
            <ArrowLeft size={18} />
          </Link>
          <div />
          <button
            type='button'
            className='icon-button invitation-filter-button'
            aria-label='Compartir invitación'
            onClick={() => void shareInvitation(invitation).catch(() => undefined)}
          >
            <Share2 size={18} />
          </button>
        </header>

        <section className={`invitation-detail-hero invitation-detail-hero-${accent}`}>
          <div className='invitation-detail-hero-art' aria-hidden='true'>
            <div className='invitation-detail-heart-wrap'>
              <Heart size={28} />
            </div>
          </div>
          <div className='invitation-detail-hero-copy'>
            <h1>{invitation.title}</h1>
            <p>{invitation.description}</p>
          </div>
        </section>

        <section className='invitation-detail-card'>
          <dl className='invitation-detail-list'>
            <div>
              <dt>
                <CalendarDays size={16} />
                Fecha
              </dt>
              <dd>{getEventInvitationDateLabel(invitation)}</dd>
            </div>
            <div>
              <dt>
                <Clock3 size={16} />
                Hora
              </dt>
              <dd>{getEventInvitationTimeLabel(invitation)}</dd>
            </div>
            <div>
              <dt>
                <MapPin size={16} />
                Lugar
              </dt>
              <dd>{invitation.location}</dd>
            </div>
            <div>
              <dt>
                <UsersRound size={16} />
                Organiza
              </dt>
              <dd>{invitation.organizerDescription}</dd>
            </div>
          </dl>

          <p className={`invitation-status-pill invitation-status-pill-${accent}`}>
            Estado: {getEventAttendanceStatusLabel(invitation.status)}
          </p>

          {feedback ? <p className='form-feedback form-feedback-success'>{feedback}</p> : null}
          {error ? <p className='form-feedback form-feedback-error'>{error}</p> : null}

          <div className='invitation-detail-actions'>
            <button
              type='button'
              className='primary-button invitation-detail-primary'
              disabled={isResponding}
              onClick={() => void handleAttendance(2)}
            >
              {invitation.status === 2 ? 'Asistencia confirmada' : 'Confirmar asistencia'}
            </button>
            <button
              type='button'
              className='ghost-button invitation-detail-secondary'
              disabled={isResponding}
              onClick={() => void handleAttendance(3)}
            >
              {invitation.status === 3 ? 'Inasistencia registrada' : 'No asistiré'}
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

function InvitationState({ message }: { message: string }) {
  return (
    <main className='page-shell invitation-page invitation-detail-page'>
      <section className='invitation-shell'>
        <article className='admin-empty-state'>
          <strong>{message}</strong>
          <Link to='/invitaciones' className='text-link'>
            Volver a invitaciones
          </Link>
        </article>
      </section>
    </main>
  );
}

async function shareInvitation(invitation: NewEventInvitation) {
  const shareData = {
    title: invitation.title,
    text: `${invitation.title} · ${getEventInvitationDateLabel(invitation)} · ${invitation.location}`,
    url: window.location.href,
  };

  if (navigator.share) {
    await navigator.share(shareData);
    return;
  }

  await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
}
