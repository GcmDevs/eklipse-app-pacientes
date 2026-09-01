import { CalendarDays, Check, Clock3, PencilLine, Plus, Users, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyCreatedEvents } from '@/lib/events';
import type { RegisteredEvent } from '@/types/event';

type EventFilter = 'all' | 'upcoming' | 'past';

export function AdminEventsPage() {
  const [events, setEvents] = useState<RegisteredEvent[]>([]);
  const [filter, setFilter] = useState<EventFilter>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    getMyCreatedEvents()
      .then(data => {
        if (active) setEvents(data);
      })
      .catch(loadError => {
        if (active) {
          setError(
            loadError instanceof Error ? loadError.message : 'No fue posible consultar tus eventos.'
          );
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const visibleEvents = useMemo(() => {
    return events
      .filter(event => filter === 'all' || getEventTimingStatus(event) === filter)
      .sort((left, right) => {
        const leftStatus = getEventTimingStatus(left);
        const rightStatus = getEventTimingStatus(right);
        if (leftStatus !== rightStatus) return leftStatus === 'upcoming' ? -1 : 1;

        const direction = leftStatus === 'upcoming' ? 1 : -1;
        return (new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime()) * direction;
      });
  }, [events, filter]);

  const upcomingCount = events.filter(event => getEventTimingStatus(event) === 'upcoming').length;
  const totalConfirmations = events.reduce((total, event) => total + event.attendingUsersCount, 0);

  return (
    <main className='page-shell admin-page'>
      <section className='admin-page-header'>
        <div>
          <p className='eyebrow'>Gestión</p>
          <h2>Mis eventos</h2>
          <p>Consulta y modifica los eventos que registraste con este usuario.</p>
        </div>
        <Link to='/admin/eventos/nuevo' className='primary-button admin-inline-action'>
          <Plus size={16} />
          Nuevo evento
        </Link>
      </section>

      <section className='admin-invitation-mobile-summary' aria-label='Resumen de eventos'>
        <article className='admin-invitation-mobile-card'>
          <span>Registrados</span>
          <strong>{events.length}</strong>
        </article>
        <article className='admin-invitation-mobile-card'>
          <span>Próximos</span>
          <strong>{upcomingCount}</strong>
        </article>
        <article className='admin-invitation-mobile-card'>
          <span>Confirmaciones</span>
          <strong>{totalConfirmations}</strong>
        </article>
      </section>

      <section className='admin-filter-bar'>
        <select
          value={filter}
          onChange={event => setFilter(event.target.value as EventFilter)}
          className='admin-select'
          aria-label='Filtrar eventos'
        >
          <option value='all'>Todos los eventos</option>
          <option value='upcoming'>Próximos</option>
          <option value='past'>Pasados</option>
        </select>
      </section>

      {isLoading ? (
        <article className='admin-empty-state'>
          <strong>Consultando tus eventos...</strong>
        </article>
      ) : null}

      {!isLoading && error ? (
        <article className='admin-empty-state'>
          <strong>No pudimos cargar tus eventos.</strong>
          <span>{error}</span>
        </article>
      ) : null}

      {!isLoading && !error ? (
        <section className='admin-invitations-grid'>
          {visibleEvents.map(event => (
            <article key={event.id} className='admin-manage-card'>
              <div className='admin-manage-top'>
                <div className='admin-manage-copy'>
                  <span className='invitation-status-pill invitation-status-pill-teal'>
                    {getEventTimingStatus(event) === 'upcoming' ? 'Próximo' : 'Pasado'}
                  </span>
                  <strong>{event.title}</strong>
                  <p>{event.description}</p>
                </div>
                <div className='admin-manage-meta'>
                  <small className='admin-mobile-label'>Fecha</small>
                  <small>{formatEventDate(event.startsAt)}</small>
                  <small className='admin-mobile-label'>Horario</small>
                  <small>{formatEventTimeRange(event.startsAt, event.endsAt)}</small>
                </div>
              </div>

              <div className='admin-chip-row'>
                <span className='admin-chip'>
                  <Users size={14} /> {event.invitedUsersCount} invitaciones
                </span>
                <span className='admin-chip'>
                  <Clock3 size={14} /> {event.pendingUsersCount} pendientes
                </span>
                <span className='admin-chip'>
                  <Check size={14} /> {event.attendingUsersCount} asistirán
                </span>
                <span className='admin-chip'>
                  <X size={14} /> {event.notAttendingUsersCount} no asistirán
                </span>
                <span className='admin-chip'>
                  <CalendarDays size={14} /> {event.location}
                </span>
              </div>

              <div className='admin-action-row'>
                <Link
                  to={`/admin/eventos/${event.id}/editar`}
                  className='ghost-button admin-ghost-inline'
                >
                  <PencilLine size={16} />
                  Editar
                </Link>
              </div>
            </article>
          ))}
        </section>
      ) : null}

      {!isLoading && !error && visibleEvents.length === 0 ? (
        <article className='admin-empty-state'>
          <strong>
            No tienes eventos{' '}
            {filter === 'all' ? 'registrados' : filter === 'upcoming' ? 'próximos' : 'pasados'}.
          </strong>
          <span>Cuando registres un evento aparecerá en esta sección.</span>
        </article>
      ) : null}
    </main>
  );
}

function getEventTimingStatus(event: RegisteredEvent): Exclude<EventFilter, 'all'> {
  return new Date(event.endsAt).getTime() < Date.now() ? 'past' : 'upcoming';
}

function formatEventDate(value: string): string {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeZone: 'America/Bogota',
  }).format(new Date(value));
}

function formatEventTimeRange(startsAt: string, endsAt: string): string {
  const formatter = new Intl.DateTimeFormat('es-CO', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Bogota',
  });
  return `${formatter.format(new Date(startsAt))} - ${formatter.format(new Date(endsAt))}`;
}
