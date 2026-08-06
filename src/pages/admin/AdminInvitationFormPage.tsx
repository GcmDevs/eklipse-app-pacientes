import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { specialties } from '@/data/specialties'
import {
  createInvitation,
  getInvitationById,
  updateInvitation,
} from '@/lib/invitations'
import type { InvitationAccent, InvitationEditorialStatus } from '@/types/invitation'
import type { SpecialtyId } from '@/types/specialty'

type InvitationFormState = {
  title: string
  description: string
  scheduledDate: string
  startTime: string
  endTime: string
  locationLabel: string
  locationValue: string
  organizer: string
  accent: InvitationAccent
  status: InvitationEditorialStatus
  targetSpecialtyIds: SpecialtyId[]
}

const initialState: InvitationFormState = {
  title: '',
  description: '',
  scheduledDate: '2026-08-05',
  startTime: '09:00',
  endTime: '10:00',
  locationLabel: 'Lugar',
  locationValue: '',
  organizer: '',
  accent: 'teal',
  status: 'draft',
  targetSpecialtyIds: [],
}

export function AdminInvitationFormPage() {
  const navigate = useNavigate()
  const { invitationId } = useParams()
  const editingInvitation = invitationId ? getInvitationById(invitationId) : null
  const isEditing = Boolean(editingInvitation)
  const [form, setForm] = useState<InvitationFormState>(() =>
    editingInvitation
      ? {
          title: editingInvitation.title,
          description: editingInvitation.description,
          scheduledDate: editingInvitation.scheduledDate,
          startTime: editingInvitation.startTime,
          endTime: editingInvitation.endTime ?? '',
          locationLabel: editingInvitation.locationLabel,
          locationValue: editingInvitation.locationValue,
          organizer: editingInvitation.organizer,
          accent: editingInvitation.accent,
          status: editingInvitation.status,
          targetSpecialtyIds: editingInvitation.targetSpecialtyIds,
        }
      : initialState,
  )

  return (
    <main className="page-shell admin-page">
      <section className="admin-page-header">
        <div>
          <p className="eyebrow">Invitaciones</p>
          <h2>{isEditing ? 'Editar invitacion' : 'Nueva invitacion'}</h2>
          <p>Completa la informacion y define a que especialidades estara dirigida.</p>
        </div>
      </section>

      <form
        className="admin-form"
        onSubmit={(event) => {
          event.preventDefault()

          const payload = {
            title: form.title.trim(),
            description: form.description.trim(),
            scheduledDate: form.scheduledDate,
            startTime: form.startTime,
            endTime: form.endTime || undefined,
            locationLabel: form.locationLabel.trim() || 'Lugar',
            locationValue: form.locationValue.trim(),
            organizer: form.organizer.trim(),
            accent: form.accent,
            status: form.status,
            targetSpecialtyIds: form.targetSpecialtyIds,
          }

          if (isEditing && invitationId) {
            updateInvitation(invitationId, payload)
          } else {
            createInvitation(payload)
          }

          navigate('/admin/invitaciones', { replace: true })
        }}
      >
        <section className="admin-form-grid">
          <label className="field-group">
            <span>Titulo</span>
            <input
              className="admin-input"
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              required
            />
          </label>
          <label className="field-group">
            <span>Organiza</span>
            <input
              className="admin-input"
              value={form.organizer}
              onChange={(event) => setForm((current) => ({ ...current, organizer: event.target.value }))}
              required
            />
          </label>
          <label className="field-group admin-field-span">
            <span>Descripcion</span>
            <textarea
              className="admin-input admin-textarea"
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              required
            />
          </label>
          <label className="field-group">
            <span>Fecha</span>
            <input
              type="date"
              className="admin-input"
              value={form.scheduledDate}
              onChange={(event) => setForm((current) => ({ ...current, scheduledDate: event.target.value }))}
              required
            />
          </label>
          <label className="field-group">
            <span>Hora inicio</span>
            <input
              type="time"
              className="admin-input"
              value={form.startTime}
              onChange={(event) => setForm((current) => ({ ...current, startTime: event.target.value }))}
              required
            />
          </label>
          <label className="field-group">
            <span>Hora fin</span>
            <input
              type="time"
              className="admin-input"
              value={form.endTime}
              onChange={(event) => setForm((current) => ({ ...current, endTime: event.target.value }))}
            />
          </label>
          <label className="field-group">
            <span>Etiqueta de lugar</span>
            <input
              className="admin-input"
              value={form.locationLabel}
              onChange={(event) => setForm((current) => ({ ...current, locationLabel: event.target.value }))}
            />
          </label>
          <label className="field-group admin-field-span">
            <span>Lugar</span>
            <input
              className="admin-input"
              value={form.locationValue}
              onChange={(event) => setForm((current) => ({ ...current, locationValue: event.target.value }))}
              required
            />
          </label>
          <label className="field-group">
            <span>Estado</span>
            <select
              className="admin-select"
              value={form.status}
              onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as InvitationEditorialStatus }))}
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicada</option>
              <option value="archived">Archivada</option>
            </select>
          </label>
          <label className="field-group">
            <span>Color</span>
            <select
              className="admin-select"
              value={form.accent}
              onChange={(event) => setForm((current) => ({ ...current, accent: event.target.value as InvitationAccent }))}
            >
              <option value="teal">Teal</option>
              <option value="purple">Purple</option>
              <option value="amber">Amber</option>
              <option value="rose">Rose</option>
            </select>
          </label>
        </section>

        <section className="admin-panel">
          <header className="admin-panel-header">
            <div>
              <h3>Especialidades objetivo</h3>
              <p>Selecciona una o varias especialidades para publicar esta actividad.</p>
            </div>
          </header>

          <div className="admin-check-grid">
            {specialties.map((specialty) => {
              const checked = form.targetSpecialtyIds.includes(specialty.id)

              return (
                <label key={specialty.id} className={checked ? 'admin-check-card admin-check-card-active' : 'admin-check-card'}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      setForm((current) => ({
                        ...current,
                        targetSpecialtyIds: checked
                          ? current.targetSpecialtyIds.filter((value) => value !== specialty.id)
                          : [...current.targetSpecialtyIds, specialty.id],
                      }))
                    }}
                  />
                  <strong>{specialty.label}</strong>
                  <span>{specialty.description}</span>
                </label>
              )
            })}
          </div>
        </section>

        <div className="form-actions admin-form-actions">
          <button type="submit" className="primary-button admin-inline-action">
            {isEditing ? 'Guardar cambios' : 'Crear invitacion'}
          </button>
          <Link to="/admin/invitaciones" className="secondary-button admin-inline-action">
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  )
}
