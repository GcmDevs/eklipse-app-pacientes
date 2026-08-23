import { Copy, PencilLine, Plus, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { specialties } from '@/data/specialties'
import {
  deleteInvitation,
  duplicateInvitation,
  getAdminInvitations,
  getInvitationDateLabel,
  getInvitationTimingStatus,
  setInvitationStatus,
} from '@/lib/invitations'
import type { InvitationEditorialStatus } from '@/types/invitation'
import type { SpecialtyId } from '@/types/specialty'

type InvitationFilter = 'all' | InvitationEditorialStatus

export function AdminInvitationsPage() {
  const [filter, setFilter] = useState<InvitationFilter>('all')
  const [specialtyFilter, setSpecialtyFilter] = useState<'all' | string>('all')
  const invitations = getAdminInvitations()

  const visibleInvitations = useMemo(() => {
    return invitations.filter((invitation) => {
      const matchesFilter = filter === 'all' || invitation.status === filter
      const matchesSpecialty =
        specialtyFilter === 'all' ||
        invitation.targetSpecialtyIds.includes(specialtyFilter as SpecialtyId)

      return matchesFilter && matchesSpecialty
    })
  }, [filter, invitations, specialtyFilter])

  const publishedCount = visibleInvitations.filter(
    (invitation) => invitation.status === 'published',
  ).length
  const draftCount = visibleInvitations.filter(
    (invitation) => invitation.status === 'draft',
  ).length

  return (
    <main className="page-shell admin-page">
      <section className="admin-page-header">
        <div>
          <p className="eyebrow">Gestion</p>
          <h2>Invitaciones</h2>
          <p>Crea actividades por especialidad y controla su publicacion.</p>
        </div>
        <Link to="/admin/invitaciones/nueva" className="primary-button admin-inline-action">
          <Plus size={16} />
          Nueva invitacion
        </Link>
      </section>

      <section className="admin-invitation-mobile-summary" aria-label="Resumen de invitaciones">
        <article className="admin-invitation-mobile-card">
          <span>Visibles</span>
          <strong>{visibleInvitations.length}</strong>
        </article>
        <article className="admin-invitation-mobile-card">
          <span>Publicadas</span>
          <strong>{publishedCount}</strong>
        </article>
        <article className="admin-invitation-mobile-card">
          <span>Borrador</span>
          <strong>{draftCount}</strong>
        </article>
      </section>

      <section className="admin-filter-bar">
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value as InvitationFilter)}
          className="admin-select"
        >
          <option value="all">Todos los estados</option>
          <option value="draft">Borrador</option>
          <option value="published">Publicadas</option>
          <option value="archived">Archivadas</option>
        </select>

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
      </section>

      <section className="admin-invitations-grid">
        {visibleInvitations.map((invitation) => (
          <article key={invitation.id} className="admin-manage-card">
            <div className="admin-manage-top">
              <div className="admin-manage-copy">
                <span className={`invitation-status-pill invitation-status-pill-${invitation.accent}`}>
                  {invitation.status === 'published' ? 'Publicada' : invitation.status === 'draft' ? 'Borrador' : 'Archivada'}
                </span>
                <strong>{invitation.title}</strong>
                <p>{invitation.description}</p>
              </div>
              <div className="admin-manage-meta">
                <small className="admin-mobile-label">Fecha</small>
                <small>{getInvitationDateLabel(invitation)}</small>
                <small className="admin-mobile-label">Momento</small>
                <small>{getInvitationTimingStatus(invitation) === 'upcoming' ? 'Proxima' : 'Pasada'}</small>
              </div>
            </div>

            <div className="admin-chip-row">
              {invitation.targetSpecialtyIds.map((specialtyId) => {
                const specialty = specialties.find((entry) => entry.id === specialtyId)
                return (
                  <span key={specialtyId} className="admin-chip">
                    {specialty?.label ?? specialtyId}
                  </span>
                )
              })}
            </div>

            <div className="admin-action-row">
              <Link to={`/admin/invitaciones/${invitation.id}/editar`} className="ghost-button admin-ghost-inline">
                <PencilLine size={16} />
                Editar
              </Link>
              <button
                type="button"
                className="ghost-button admin-ghost-inline"
                onClick={() => {
                  duplicateInvitation(invitation.id)
                }}
              >
                <Copy size={16} />
                Duplicar
              </button>
              <button
                type="button"
                className="ghost-button admin-ghost-inline"
                onClick={() => {
                  setInvitationStatus(
                    invitation.id,
                    invitation.status === 'published' ? 'archived' : 'published',
                  )
                }}
              >
                {invitation.status === 'published' ? 'Archivar' : 'Publicar'}
              </button>
              <button
                type="button"
                className="ghost-button admin-ghost-inline admin-danger-inline"
                onClick={() => {
                  deleteInvitation(invitation.id)
                }}
              >
                <Trash2 size={16} />
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
