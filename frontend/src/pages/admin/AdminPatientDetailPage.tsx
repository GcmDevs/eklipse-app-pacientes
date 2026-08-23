import { ArrowLeft, HeartPulse, Waves } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getPatientMonitoringDetail } from '@/lib/admin-monitoring'

export function AdminPatientDetailPage() {
  const { patientId } = useParams()
  const detail = patientId ? getPatientMonitoringDetail(patientId) : null

  if (!detail || !detail.summary) {
    return (
      <main className="page-shell admin-page">
        <section className="admin-empty-state admin-empty-state-large">
          <strong>No encontramos este paciente.</strong>
          <Link to="/admin/pacientes" className="text-link">
            Volver al listado
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell admin-page">
      <Link to="/admin/pacientes" className="invitation-back-link admin-back-link">
        <ArrowLeft size={18} />
        <span>Volver</span>
      </Link>

      <section className="admin-detail-hero">
        <div>
          <p className="eyebrow">Paciente</p>
          <h2>{detail.patient.fullName}</h2>
          <p>
            {detail.patient.documentType} {detail.patient.documentNumber} · {detail.patient.specialtyLabel}
          </p>
        </div>
        <div className="admin-detail-meta">
          <span className={`monitoring-badge monitoring-badge-${detail.summary.monitoringStatus}`}>
            {getMonitoringLabel(detail.summary.monitoringStatus)}
          </span>
          <small>{detail.summary.lastReportAt ? formatDateTime(detail.summary.lastReportAt) : 'Sin actividad reciente'}</small>
        </div>
      </section>

      <section className="admin-grid">
        <section className="admin-panel">
          <header className="admin-panel-header">
            <div>
              <h3>Datos generales</h3>
              <p>Informacion base del paciente y su seguimiento.</p>
            </div>
          </header>
          <dl className="admin-detail-grid">
            <div><dt>Especialidad</dt><dd>{detail.patient.specialtyLabel}</dd></div>
            <div><dt>Institucion</dt><dd>{detail.patient.institution}</dd></div>
            <div><dt>Correo</dt><dd>{detail.patient.email}</dd></div>
            <div><dt>Celular</dt><dd>{detail.patient.mobilePhone}</dd></div>
            <div><dt>Ultimo sintoma</dt><dd>{detail.summary.latestSymptomName ?? 'Sin registro'}</dd></div>
            <div><dt>Ultimo estado de animo</dt><dd>{detail.summary.latestMood ?? 'Sin registro'}</dd></div>
          </dl>
        </section>

        <section className="admin-panel">
          <header className="admin-panel-header">
            <div>
              <h3>Senales rapidas</h3>
              <p>Lectura inmediata de actividad y severidad.</p>
            </div>
          </header>

          <div className="admin-stat-list">
            <div className="admin-stat-row">
              <span className="admin-stat-label"><HeartPulse size={16} /> Estado de animo</span>
              <strong>{detail.summary.latestMood ?? 'Sin registro'}</strong>
            </div>
            <div className="admin-stat-row">
              <span className="admin-stat-label"><Waves size={16} /> Severidad reportada</span>
              <strong>{detail.summary.latestSeverityLabel ?? 'Sin registro'}</strong>
            </div>
          </div>
        </section>
      </section>

      <section className="admin-grid">
        <section className="admin-panel">
          <header className="admin-panel-header">
            <div>
              <h3>Historial de sintomas</h3>
              <p>Ultimos registros guardados en este dispositivo.</p>
            </div>
          </header>
          <div className="admin-history-list">
            {detail.symptomHistory.length > 0 ? detail.symptomHistory.map((record) => (
              <article key={record.id} className="admin-history-row">
                <div>
                  <strong>{record.symptomName}</strong>
                  <span>{record.severityLabel}</span>
                </div>
                <small>{formatDateTime(record.createdAt)}</small>
              </article>
            )) : <p className="admin-empty-copy">Aun no hay sintomas registrados.</p>}
          </div>
        </section>

        <section className="admin-panel">
          <header className="admin-panel-header">
            <div>
              <h3>Historial de estado de animo</h3>
              <p>Registros recientes del acompanamiento emocional.</p>
            </div>
          </header>
          <div className="admin-history-list">
            {detail.moodHistory.length > 0 ? detail.moodHistory.map((record) => (
              <article key={record.id} className="admin-history-row">
                <div>
                  <strong>{record.mood}</strong>
                  <span>{record.influence}</span>
                </div>
                <small>{formatDateTime(record.createdAt)}</small>
              </article>
            )) : <p className="admin-empty-copy">Aun no hay estados de animo registrados.</p>}
          </div>
        </section>
      </section>
    </main>
  )
}

function getMonitoringLabel(status: string) {
  if (status === 'attention') return 'Atencion'
  if (status === 'stale') return 'Sin reporte reciente'
  if (status === 'stable') return 'Estable'
  return 'Sin datos'
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Bogota',
  }).format(new Date(value))
}
