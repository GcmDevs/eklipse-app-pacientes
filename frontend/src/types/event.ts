export type EventAttendanceStatus = 1 | 2 | 3;

export type CreateEventInput = {
  title: string;
  description: string;
  location: string;
  startsAt: string;
  endsAt: string;
  organizerDescription: string;
};

export type UpdateEventInput = CreateEventInput & {
  eventId: number;
};

export type NewEvent = CreateEventInput & {
  id: number;
  createdAt: string;
};

export type NewEventInvitation = NewEvent & {
  invitationId: number;
  status: EventAttendanceStatus;
  invitedAt: string;
  respondedAt: string | null;
};

export type CreatedEvent = NewEvent & {
  connectedUsersCount: number;
  invitedUsersCount: number;
};

export type RegisteredEvent = NewEvent & {
  updatedAt: string;
  invitedUsersCount: number;
  pendingUsersCount: number;
  attendingUsersCount: number;
  notAttendingUsersCount: number;
};

export type UpdatedEvent = RegisteredEvent & {
  connectedUsersCount: number;
};

export type EventActionAck<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};
