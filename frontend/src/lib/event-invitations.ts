import type { EventAttendanceStatus, NewEventInvitation } from '@/types/event';

export type EventInvitationTimingStatus = 'upcoming' | 'past';
export type EventInvitationAccent = 'teal' | 'purple' | 'amber' | 'rose';

const accents: EventInvitationAccent[] = ['teal', 'purple', 'amber', 'rose'];

export function getEventInvitationTimingStatus(
  invitation: NewEventInvitation
): EventInvitationTimingStatus {
  return new Date(invitation.endsAt).getTime() < Date.now() ? 'past' : 'upcoming';
}

export function getEventInvitationDateLabel(invitation: NewEventInvitation): string {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'long',
    timeZone: 'America/Bogota',
  }).format(new Date(invitation.startsAt));
}

export function getEventInvitationTimeLabel(invitation: NewEventInvitation): string {
  const formatter = new Intl.DateTimeFormat('es-CO', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Bogota',
  });

  return `${formatter.format(new Date(invitation.startsAt))} - ${formatter.format(new Date(invitation.endsAt))}`;
}

export function getEventAttendanceStatusLabel(status: EventAttendanceStatus): string {
  if (status === 2) return 'Asistiré';
  if (status === 3) return 'No asistiré';
  return 'Pendiente';
}

export function getEventInvitationAccent(invitationId: number): EventInvitationAccent {
  return accents[Math.abs(invitationId) % accents.length];
}

export function upsertEventInvitation(
  invitations: NewEventInvitation[],
  invitation: NewEventInvitation
): NewEventInvitation[] {
  const existingIndex = invitations.findIndex(
    current => current.invitationId === invitation.invitationId
  );
  if (existingIndex < 0) return [invitation, ...invitations];

  return invitations.map(current =>
    current.invitationId === invitation.invitationId ? invitation : current
  );
}
