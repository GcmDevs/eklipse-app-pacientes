import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { specialties } from '@/data/specialties'
import { getPatientMonitoringSummaries } from '@/lib/admin-monitoring'
import type { MonitoringStatus } from '@/types/admin'

type StatusFilter = 'all' | MonitoringStatus

export function AdminPatientsPage() {
  const [query, setQuery] = useState('')
  const [specialtyFilter, setSpecialtyFilter] = useState<'all' | string>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const summaries = getPatientMonitoringSummaries()

  const filteredSummaries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return summaries.filter((summary) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        summary.patient.fullName.toLowerCase().includes(normalizedQuery) ||
        summary.patient.documentNumber.includes(normalizedQuery)
      const matchesSpecialty =
        specialtyFilter === 'all' || summary.patient.specialtyId === specialtyFilter
      const matchesStatus =
        statusFilter === 'all' || summary.monitoringStatus === statusFilter

      return matchesQuery && matchesSpecialty && matchesStatus
    })
  }, [query, specialtyFilter, statusFilter, summaries])

  const attentionCount = filteredSummaries.filter(
    (summary) => summary.monitoringStatus === 'attention',
  ).length
  const staleCount = filteredSummaries.filter(
    (summary) => summary.monitoringStatus === 'stale',
  ).length

  return (
    <main className="page-shell admin-page">
      <section className="admin-page-header">
        <div>
          <p className="eyebrow">Monitoreo</p>
          <h2>Pacientes</h2>
          <p>Busca por nombre o documento y prioriza el seguimiento clinico.</p>
        </div>
      </section>

      <section className="admin-patient-mobile-summary" aria-label="Resumen de pacientes">
        <article className="admin-patient-mobile-card">
          <span>Visibles</span>
          <strong>{filteredSummaries.length}</strong>
        </article>
        <article className="admin-patient-mobile-card">
          <span>Atencion</span>
          <strong>{attentionCount}</strong>
        </article>
        <article className="admin-patient-mobile-card">
          <span>Sin reporte</span>
          <strong>{staleCount}</strong>
        </article>
      </section>

      <section className="admin-filter-bar">
        <label className="admin-search-field">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar paciente o documento"
          />
        </label>

        <select
          value={specialtyFilter}
          onChange={(event) => setSpecialtyFilter(event.target.value)}
          className="admin-select"
        >
          <option value="all">Todas las especialidades</option>
          {specialties.map((specialty) => (
            <option key={specialty.id} value={specialty.id}>
              {specialty.label}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
          className="admin-select"
        >
          <option value="all">Todos los estados</option>
          <option value="attention">Atencion</option>
          <option value="stable">Estable</option>
          <option value="stale">Sin reporte reciente</option>
          <option value="no-data">Sin datos</option>
        </select>
      </section>

      <section className="admin-table" aria-label="Listado de pacientes">
        <div className="admin-table-head">
          <span>Paciente</span>
          <span>Especialidad</span>
          <span>Ultimo sintoma</span>
          <span>Estado de animo</span>
          <span>Ultimo movimiento</span>
          <span />
        </div>

        {filteredSummaries.map((summary) => (
          <article key={summary.patient.id} className="admin-table-row">
            <div className="admin-table-primary">
              <strong>{summary.patient.fullName}</strong>
              <small>{summary.patient.documentNumber}</small>
            </div>
            <div className="admin-table-mobile-grid">
              <div className="admin-table-detail">
                <small className="admin-mobile-label">Especialidad</small>
                <span>{summary.specialtyLabel}</span>
              </div>
              <div className="admin-table-detail">
                <small className="admin-mobile-label">Estado de animo</small>
                <span>{summary.latestMood ?? 'Sin registro'}</span>
              </div>
              <div className="admin-table-detail admin-table-detail-wide">
                <small className="admin-mobile-label">Ultimo sintoma</small>
                <span>{summary.latestSymptomName ?? 'Sin registro'}</span>
              </div>
            </div>
            <div className="admin-table-status">
              <small className="admin-mobile-label">Seguimiento</small>
              <span className={`monitoring-badge monitoring-badge-${summary.monitoringStatus}`}>
                {getMonitoringLabel(summary.monitoringStatus)}
              </span>
              <small>{summary.lastReportAt ? formatDateTime(summary.lastReportAt) : 'Sin actividad'}</small>
            </div>
            <div className="admin-table-action">
              <Link to={`/admin/pacientes/${summary.patient.id}`} className="text-link">
                Ver detalle
              </Link>
            </div>
          </article>
        ))}

        {filteredSummaries.length === 0 ? (
          <div className="admin-empty-state">
            <strong>No encontramos pacientes con esos filtros.</strong>
            <span>Ajusta la busqueda o cambia los criterios para continuar.</span>
          </div>
        ) : null}
      </section>
    </main>
  )
}

function getMonitoringLabel(status: string) {
  if (status === 'attention') return 'Atencion'
  if (status === 'stale') return 'Sin reporte'
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
