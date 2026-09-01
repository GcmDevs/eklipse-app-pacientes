import { Activity, AlertTriangle, CalendarDays, HeartPulse, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdminDashboardMetrics, getPatientMonitoringSummaries } from '@/lib/admin-monitoring';
import { getMyCreatedEvents } from '@/lib/events';
import type { RegisteredEvent } from '@/types/event';

export function AdminDashboardPage() {
  const [events, setEvents] = useState<RegisteredEvent[]>([]);
  const [referenceTime] = useState(() => Date.now());
  const metrics = getAdminDashboardMetrics();
  const patientSummaries = getPatientMonitoringSummaries().slice(0, 5);
  const upcomingEvents = events
    .filter(event => new Date(event.endsAt).getTime() >= referenceTime)
    .sort((left, right) => new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime())
    .slice(0, 4);

  useEffect(() => {
    let active = true;
    getMyCreatedEvents()
      .then(data => {
        if (active) setEvents(data);
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className='page-shell admin-dashboard'>
      <section className='admin-hero'>
        <div className='admin-hero-copy'>
          <p className='eyebrow'>Panel clinico</p>
          <h2>Monitorea pacientes y organiza actividades por especialidad.</h2>
          <p>
            Revisa senales de seguimiento, prioriza pacientes que requieren atencion y organiza
            eventos para tus pacientes desde un solo lugar.
          </p>
          <div className='admin-hero-summary' aria-label='Resumen rapido'>
            <article className='admin-hero-summary-card'>
              <span>Atencion hoy</span>
              <strong>{metrics.patientsNeedingAttention}</strong>
            </article>
            <article className='admin-hero-summary-card'>
              <span>Eventos próximos</span>
              <strong>{upcomingEvents.length}</strong>
            </article>
          </div>
        </div>
        <div className='admin-hero-actions'>
          <Link to='/admin/pacientes' className='primary-button admin-inline-action'>
            Ver pacientes
          </Link>
          <Link to='/admin/eventos/nuevo' className='ghost-button admin-inline-action'>
            Nuevo evento
          </Link>
        </div>
      </section>

      <section className='admin-kpi-grid' aria-label='Indicadores clinicos'>
        <article className='admin-kpi-card'>
          <span className='admin-kpi-icon admin-kpi-icon-teal' aria-hidden='true'>
            <Users size={18} />
          </span>
          <strong>{metrics.totalPatients}</strong>
          <span>Pacientes monitoreados</span>
        </article>
        <article className='admin-kpi-card'>
          <span className='admin-kpi-icon admin-kpi-icon-amber' aria-hidden='true'>
            <HeartPulse size={18} />
          </span>
          <strong>{metrics.patientsReportedToday}</strong>
          <span>Con reporte hoy</span>
        </article>
        <article className='admin-kpi-card'>
          <span className='admin-kpi-icon admin-kpi-icon-rose' aria-hidden='true'>
            <AlertTriangle size={18} />
          </span>
          <strong>{metrics.patientsNeedingAttention}</strong>
          <span>Requieren atencion</span>
        </article>
        <article className='admin-kpi-card'>
          <span className='admin-kpi-icon admin-kpi-icon-blue' aria-hidden='true'>
            <CalendarDays size={18} />
          </span>
          <strong>{metrics.patientsMissingRecentReport}</strong>
          <span>Sin reporte reciente</span>
        </article>
      </section>

      <section className='admin-grid'>
        <section className='admin-panel'>
          <header className='admin-panel-header'>
            <div>
              <h3>Pacientes priorizados</h3>
              <p>Ultimos movimientos y seguimiento por especialidad.</p>
            </div>
            <Link to='/admin/pacientes' className='text-link'>
              Ver todos
            </Link>
          </header>

          <div className='admin-patient-list'>
            {patientSummaries.map(summary => (
              <Link
                key={summary.patient.id}
                to={`/admin/pacientes/${summary.patient.id}`}
                className={`admin-patient-row admin-patient-row-${summary.monitoringStatus}`}
              >
                <div>
                  <strong>{summary.patient.fullName}</strong>
                  <span>{summary.specialtyLabel}</span>
                </div>
                <div>
                  <strong>{summary.latestSymptomName ?? 'Sin sintomas reportados'}</strong>
                  <span>{summary.latestMood ?? 'Sin estado de animo registrado'}</span>
                </div>
                <div className='admin-patient-end'>
                  <span className={`monitoring-badge monitoring-badge-${summary.monitoringStatus}`}>
                    {getMonitoringLabel(summary.monitoringStatus)}
                  </span>
                  <small>
                    {summary.lastReportAt ? formatDateTime(summary.lastReportAt) : 'Sin actividad'}
                  </small>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className='admin-panel'>
          <header className='admin-panel-header'>
            <div>
              <h3>Próximos eventos</h3>
              <p>Eventos que registraste y están disponibles para los pacientes invitados.</p>
            </div>
            <Link to='/admin/eventos' className='text-link'>
              Gestionar
            </Link>
          </header>

          <div className='admin-invitation-stack'>
            {upcomingEvents.map(event => (
              <article key={event.id} className='admin-invitation-card admin-invitation-card-teal'>
                <div className='admin-invitation-card-top'>
                  <strong>{event.title}</strong>
                  <span className='admin-invitation-date-pill'>
                    {formatEventDate(event.startsAt)}
                  </span>
                </div>
                <small>
                  {event.attendingUsersCount} confirmados de {event.invitedUsersCount} invitados
                </small>
              </article>
            ))}
            {upcomingEvents.length === 0 ? (
              <p className='admin-empty-copy'>No tienes eventos próximos.</p>
            ) : null}
          </div>
        </section>
      </section>

      <section className='admin-grid'>
        <section className='admin-panel'>
          <header className='admin-panel-header'>
            <div>
              <h3>Sintomas mas reportados</h3>
              <p>Lectura operativa de lo que mas se esta registrando.</p>
            </div>
          </header>

          <div className='admin-stat-list'>
            {metrics.topSymptoms.length > 0 ? (
              metrics.topSymptoms.map(item => (
                <div key={item.symptomName} className='admin-stat-row'>
                  <span className='admin-stat-label'>
                    <Activity size={16} />
                    {item.symptomName}
                  </span>
                  <strong>{item.count}</strong>
                </div>
              ))
            ) : (
              <p className='admin-empty-copy'>
                Todavia no hay sintomas registrados en este dispositivo.
              </p>
            )}
          </div>
        </section>

        <section className='admin-panel'>
          <header className='admin-panel-header'>
            <div>
              <h3>Distribucion emocional</h3>
              <p>Resumen de los estados de animo registrados recientemente.</p>
            </div>
          </header>

          <div className='admin-alert-list'>
            {metrics.moodDistribution.length > 0 ? (
              metrics.moodDistribution.map(item => (
                <div key={item.mood} className='admin-alert-row'>
                  <div>
                    <strong>{item.mood}</strong>
                    <span>Registros acumulados</span>
                  </div>
                  <div className='admin-patient-end'>
                    <strong>{item.count}</strong>
                    <small>entradas</small>
                  </div>
                </div>
              ))
            ) : (
              <p className='admin-empty-copy'>Aun no hay estados de animo registrados.</p>
            )}
          </div>
        </section>
      </section>

      <section className='admin-panel'>
        <header className='admin-panel-header'>
          <div>
            <h3>Senales de mayor severidad</h3>
            <p>Pacientes con registros que conviene revisar primero.</p>
          </div>
        </header>

        <div className='admin-alert-list'>
          {metrics.highestSeveritySymptoms.length > 0 ? (
            metrics.highestSeveritySymptoms.map(item => (
              <div key={`${item.patientName}-${item.createdAt}`} className='admin-alert-row'>
                <div>
                  <strong>{item.patientName}</strong>
                  <span>{item.symptomName}</span>
                </div>
                <div className='admin-patient-end'>
                  <strong>{item.severityLabel}</strong>
                  <small>{formatDateTime(item.createdAt)}</small>
                </div>
              </div>
            ))
          ) : (
            <p className='admin-empty-copy'>Aun no hay registros de severidad para mostrar.</p>
          )}
        </div>
      </section>
    </main>
  );
}

function getMonitoringLabel(status: string) {
  if (status === 'attention') return 'Atencion';
  if (status === 'stale') return 'Sin reporte reciente';
  if (status === 'stable') return 'Estable';
  return 'Sin datos';
}

function formatEventDate(value: string) {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeZone: 'America/Bogota',
  }).format(new Date(value));
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Bogota',
  }).format(new Date(value));
}
