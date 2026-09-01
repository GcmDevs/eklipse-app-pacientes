import { CalendarPlus, Info, PencilLine, RadioTower } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthSession } from '@/lib/auth';
import { createEvent, getMyCreatedEvents, updateEvent } from '@/lib/events';

type EventFormState = {
  title: string;
  description: string;
  location: string;
  startsAt: string;
  endsAt: string;
  organizerDescription: string;
};

type FormFeedback = {
  kind: 'error' | 'success';
  message: string;
} | null;

export function AdminEventFormPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const numericEventId = Number(eventId);
  const isEditing = eventId !== undefined;
  const session = getAuthSession();
  const [form, setForm] = useState<EventFormState>(createInitialForm);
  const [feedback, setFeedback] = useState<FormFeedback>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingEvent, setIsLoadingEvent] = useState(isEditing);

  useEffect(() => {
    if (!isEditing) return;
    let active = true;

    getMyCreatedEvents()
      .then(events => {
        if (!active) return;
        const event = events.find(current => current.id === numericEventId);
        if (!event) {
          setFeedback({
            kind: 'error',
            message: 'El evento no existe o no fue registrado por este usuario.',
          });
          return;
        }

        setForm({
          title: event.title,
          description: event.description,
          location: event.location,
          startsAt: toDateTimeLocalValue(new Date(event.startsAt)),
          endsAt: toDateTimeLocalValue(new Date(event.endsAt)),
          organizerDescription: event.organizerDescription,
        });
      })
      .catch(error => {
        if (active) {
          setFeedback({
            kind: 'error',
            message: error instanceof Error ? error.message : 'No fue posible cargar el evento.',
          });
        }
      })
      .finally(() => {
        if (active) setIsLoadingEvent(false);
      });

    return () => {
      active = false;
    };
  }, [isEditing, numericEventId]);

  const updateField = (field: keyof EventFormState, value: string) => {
    setForm(current => ({ ...current, [field]: value }));
    setFeedback(null);
  };

  const handleSubmit = async (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    const startsAt = new Date(form.startsAt);
    const endsAt = new Date(form.endsAt);

    if (Number.isNaN(startsAt.getTime()) || Number.isNaN(endsAt.getTime())) {
      setFeedback({ kind: 'error', message: 'Selecciona un rango de fechas válido.' });
      return;
    }

    if (endsAt <= startsAt) {
      setFeedback({
        kind: 'error',
        message: 'La fecha de finalización debe ser posterior a la fecha de inicio.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const eventInput = {
        title: form.title.trim(),
        description: form.description.trim(),
        location: form.location.trim(),
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
        organizerDescription: form.organizerDescription.trim(),
      };
      const savedEvent = isEditing
        ? await updateEvent({ ...eventInput, eventId: numericEventId })
        : await createEvent(eventInput);

      if (!isEditing) setForm(createInitialForm());
      setFeedback({
        kind: 'success',
        message: isEditing
          ? `Evento actualizado. Se notificó el cambio a ${savedEvent.connectedUsersCount} paciente${savedEvent.connectedUsersCount === 1 ? '' : 's'} invitado${savedEvent.connectedUsersCount === 1 ? '' : 's'} y conectado${savedEvent.connectedUsersCount === 1 ? '' : 's'}.`
          : `Evento creado con ${savedEvent.invitedUsersCount} invitación${savedEvent.invitedUsersCount === 1 ? '' : 'es'} para pacientes registrados. Se entregó en tiempo real a ${savedEvent.connectedUsersCount} paciente${savedEvent.connectedUsersCount === 1 ? '' : 's'} invitado${savedEvent.connectedUsersCount === 1 ? '' : 's'} y conectado${savedEvent.connectedUsersCount === 1 ? '' : 's'}.`,
      });
    } catch (error) {
      setFeedback({
        kind: 'error',
        message:
          error instanceof Error
            ? error.message
            : `No fue posible ${isEditing ? 'modificar' : 'crear'} el evento.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className='page-shell admin-page'>
      <section className='admin-page-header'>
        <div>
          <p className='eyebrow'>Eventos</p>
          <h2>{isEditing ? 'Modificar evento' : 'Crear un nuevo evento'}</h2>
          <p>
            {isEditing
              ? 'Actualiza la información que verán los pacientes invitados.'
              : 'Define la información pública y el rango de fechas del evento.'}
          </p>
        </div>
        <span className='event-header-icon' aria-hidden='true'>
          <CalendarPlus size={24} />
        </span>
      </section>

      <aside className='event-owner-note'>
        <Info size={19} aria-hidden='true' />
        <div>
          <strong>Propietario privado</strong>
          <span>
            El evento {isEditing ? 'está' : 'se asociará'} al usuario autenticado{' '}
            {session?.user.name ?? ''}. Este dato no se muestra como información pública del
            organizador.
          </span>
        </div>
      </aside>

      <form className='admin-form' onSubmit={handleSubmit}>
        <section className='admin-form-grid'>
          <label className='field-group'>
            <span>Título</span>
            <input
              className='admin-input'
              value={form.title}
              maxLength={160}
              onChange={event => updateField('title', event.target.value)}
              placeholder='Nombre del evento'
              required
            />
          </label>

          <label className='field-group'>
            <span>Organizador visible al público</span>
            <input
              className='admin-input'
              value={form.organizerDescription}
              maxLength={200}
              onChange={event => updateField('organizerDescription', event.target.value)}
              placeholder='Ej. Equipo de Bienestar Eklipse'
              required
            />
          </label>

          <label className='field-group admin-field-span'>
            <span>Descripción</span>
            <textarea
              className='admin-input admin-textarea'
              value={form.description}
              onChange={event => updateField('description', event.target.value)}
              placeholder='Describe el propósito y los detalles importantes del evento'
              required
            />
          </label>

          <label className='field-group admin-field-span'>
            <span>Lugar</span>
            <input
              className='admin-input'
              value={form.location}
              maxLength={250}
              onChange={event => updateField('location', event.target.value)}
              placeholder='Dirección, sede o enlace de conexión'
              required
            />
          </label>

          <label className='field-group'>
            <span>Fecha y hora de inicio</span>
            <input
              type='datetime-local'
              className='admin-input'
              value={form.startsAt}
              onChange={event => updateField('startsAt', event.target.value)}
              required
            />
          </label>

          <label className='field-group'>
            <span>Fecha y hora de finalización</span>
            <input
              type='datetime-local'
              className='admin-input'
              value={form.endsAt}
              min={form.startsAt}
              onChange={event => updateField('endsAt', event.target.value)}
              required
            />
          </label>
        </section>

        <section className='admin-panel event-invite-panel'>
          <header className='admin-panel-header'>
            <div>
              <h3>Propagación automática</h3>
              <p>
                {isEditing
                  ? 'Los cambios se guardarán en el evento existente y se notificarán en tiempo real a los pacientes invitados que estén conectados.'
                  : 'Al crear el evento se generará una invitación pendiente para cada paciente registrado y se notificará en tiempo real a quienes estén conectados.'}
              </p>
            </div>
            <RadioTower size={20} aria-hidden='true' />
          </header>
        </section>

        {feedback ? (
          <div
            className={`event-form-feedback event-form-feedback-${feedback.kind}`}
            role={feedback.kind === 'error' ? 'alert' : 'status'}
          >
            {feedback.message}
          </div>
        ) : null}

        <div className='form-actions admin-form-actions'>
          <button
            type='submit'
            className='primary-button admin-inline-action'
            disabled={isSubmitting || isLoadingEvent}
          >
            {isEditing ? (
              <PencilLine size={17} aria-hidden='true' />
            ) : (
              <CalendarPlus size={17} aria-hidden='true' />
            )}
            {isSubmitting
              ? isEditing
                ? 'Guardando cambios...'
                : 'Creando evento...'
              : isEditing
                ? 'Guardar cambios'
                : 'Crear evento'}
          </button>
          <button
            type='button'
            className='secondary-button admin-inline-action'
            disabled={isSubmitting || isLoadingEvent}
            onClick={() => {
              if (isEditing) {
                navigate('/admin/eventos');
              } else {
                setForm(createInitialForm());
                setFeedback(null);
              }
            }}
          >
            {isEditing ? 'Cancelar' : 'Limpiar'}
          </button>
        </div>
      </form>
    </main>
  );
}

function createInitialForm(): EventFormState {
  const startsAt = new Date();
  startsAt.setMinutes(0, 0, 0);
  startsAt.setHours(startsAt.getHours() + 1);

  const endsAt = new Date(startsAt);
  endsAt.setHours(endsAt.getHours() + 1);

  return {
    title: '',
    description: '',
    location: '',
    startsAt: toDateTimeLocalValue(startsAt),
    endsAt: toDateTimeLocalValue(endsAt),
    organizerDescription: '',
  };
}

function toDateTimeLocalValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
