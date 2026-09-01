import { BellRing, MapPin, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { disconnectEventSocket, onNewEventInvitation } from '@/lib/events';
import type { NewEventInvitation } from '@/types/event';

const NOTIFICATION_DURATION_MS = 10_000;

export function EventSocketBridge() {
  const [invitation, setInvitation] = useState<NewEventInvitation | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = onNewEventInvitation(setInvitation);
      return () => {
        unsubscribe();
        disconnectEventSocket();
      };
    } catch {
      return undefined;
    }
  }, []);

  useEffect(() => {
    if (!invitation) return;
    const timeout = window.setTimeout(() => setInvitation(null), NOTIFICATION_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [invitation]);

  if (!invitation) return null;

  return (
    <aside className='event-live-invitation' role='status' aria-live='polite'>
      <span className='event-live-invitation-icon' aria-hidden='true'>
        <BellRing size={20} />
      </span>
      <div className='event-live-invitation-copy'>
        <span>Nueva invitación</span>
        <strong>{invitation.title}</strong>
        <small>{invitation.organizerDescription}</small>
        <small>
          <MapPin size={13} aria-hidden='true' />
          {invitation.location} · {formatEventDate(invitation.startsAt)}
        </small>
      </div>
      <button
        type='button'
        className='event-live-invitation-close'
        aria-label='Cerrar notificación'
        onClick={() => setInvitation(null)}
      >
        <X size={17} />
      </button>
    </aside>
  );
}

function formatEventDate(value: string) {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Bogota',
  }).format(new Date(value));
}
