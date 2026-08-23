import { invitationSeed } from '@/data/invitations'
import { getCurrentPatient, getCurrentUserRole } from '@/lib/auth'
import type { Invitation, InvitationEditorialStatus } from '@/types/invitation'
import type { Patient } from '@/types/patient'
import type { SpecialtyId } from '@/types/specialty'

const INVITATIONS_STORAGE_KEY = 'eklipse_invitations'
const REFERENCE_DATE = new Date('2026-08-03T00:00:00-05:00')

export type InvitationTimingStatus = 'upcoming' | 'past'

export type InvitationInput = Omit<Invitation, 'id'>

export function getStoredInvitations() {
  const raw = localStorage.getItem(INVITATIONS_STORAGE_KEY)

  if (!raw) {
    localStorage.setItem(INVITATIONS_STORAGE_KEY, JSON.stringify(invitationSeed))
    return invitationSeed
  }

  try {
    const parsed = JSON.parse(raw) as unknown

    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(INVITATIONS_STORAGE_KEY, JSON.stringify(invitationSeed))
      return invitationSeed
    }

    const normalizedInvitations = parsed.map(normalizeInvitation)
    localStorage.setItem(INVITATIONS_STORAGE_KEY, JSON.stringify(normalizedInvitations))
    return normalizedInvitations
  } catch {
    localStorage.setItem(INVITATIONS_STORAGE_KEY, JSON.stringify(invitationSeed))
    return invitationSeed
  }
}

export function saveInvitations(invitations: Invitation[]) {
  localStorage.setItem(INVITATIONS_STORAGE_KEY, JSON.stringify(invitations))
}

export function getInvitationById(invitationId: string) {
  return getStoredInvitations().find((invitation) => invitation.id === invitationId) ?? null
}

export function createInvitationId() {
  return `invitation-${crypto.randomUUID()}`
}

export function createInvitation(input: InvitationInput) {
  const invitation: Invitation = {
    id: createInvitationId(),
    ...input,
  }

  saveInvitations([invitation, ...getStoredInvitations()])
  return invitation
}

export function updateInvitation(invitationId: string, input: InvitationInput) {
  const updated = getStoredInvitations().map((invitation) =>
    invitation.id === invitationId ? { id: invitationId, ...input } : invitation,
  )

  saveInvitations(updated)
  return updated.find((invitation) => invitation.id === invitationId) ?? null
}

export function deleteInvitation(invitationId: string) {
  saveInvitations(
    getStoredInvitations().filter((invitation) => invitation.id !== invitationId),
  )
}

export function duplicateInvitation(invitationId: string) {
  const invitation = getInvitationById(invitationId)

  if (!invitation) {
    return null
  }

  return createInvitation({
    title: `${invitation.title} (copia)`,
    description: invitation.description,
    scheduledDate: invitation.scheduledDate,
    startTime: invitation.startTime,
    endTime: invitation.endTime,
    locationLabel: invitation.locationLabel,
    locationValue: invitation.locationValue,
    organizer: invitation.organizer,
    accent: invitation.accent,
    targetSpecialtyIds: invitation.targetSpecialtyIds,
    status: 'draft',
  })
}

export function setInvitationStatus(
  invitationId: string,
  status: InvitationEditorialStatus,
) {
  const invitation = getInvitationById(invitationId)

  if (!invitation) {
    return null
  }

  return updateInvitation(invitationId, {
    title: invitation.title,
    description: invitation.description,
    scheduledDate: invitation.scheduledDate,
    startTime: invitation.startTime,
    endTime: invitation.endTime,
    locationLabel: invitation.locationLabel,
    locationValue: invitation.locationValue,
    organizer: invitation.organizer,
    accent: invitation.accent,
    targetSpecialtyIds: invitation.targetSpecialtyIds,
    status,
  })
}

export function getInvitationTimingStatus(
  invitation: Invitation,
  referenceDate = REFERENCE_DATE,
): InvitationTimingStatus {
  const invitationDate = new Date(`${invitation.scheduledDate}T00:00:00`)
  const reference = new Date(referenceDate)
  reference.setHours(0, 0, 0, 0)

  return invitationDate < reference ? 'past' : 'upcoming'
}

export function getInvitationDateLabel(invitation: Invitation) {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'long',
    timeZone: 'America/Bogota',
  }).format(new Date(`${invitation.scheduledDate}T00:00:00`))
}

export function getInvitationTimeLabel(invitation: Invitation) {
  const start = formatTime(invitation.startTime)
  if (!invitation.endTime) {
    return start
  }

  return `${start} - ${formatTime(invitation.endTime)}`
}

export function getAdminInvitations() {
  return [...getStoredInvitations()].sort(sortInvitations)
}

export function getVisibleInvitationsForPatient(patient: Patient) {
  return getStoredInvitations()
    .filter((invitation) => invitation.status === 'published')
    .filter((invitation) => invitation.targetSpecialtyIds.includes(patient.specialtyId))
    .sort(sortInvitations)
}

export function getVisibleInvitationsForCurrentUser() {
  const role = getCurrentUserRole()

  if (role === 'admin') {
    return getAdminInvitations()
  }

  return getVisibleInvitationsForPatient(getCurrentPatient())
}

export function getInvitationCountsByStatus(invitations: Invitation[]) {
  return invitations.reduce(
    (accumulator, invitation) => {
      const timingStatus = getInvitationTimingStatus(invitation)
      accumulator.total += 1

      if (timingStatus === 'upcoming') {
        accumulator.upcoming += 1
      } else {
        accumulator.past += 1
      }

      return accumulator
    },
    { total: 0, upcoming: 0, past: 0 },
  )
}

export function getUpcomingPublishedInvitationCountForCurrentUser() {
  const invitations = getVisibleInvitationsForCurrentUser()

  return invitations.filter((invitation) => {
    return (
      invitation.status === 'published' &&
      getInvitationTimingStatus(invitation) === 'upcoming'
    )
  }).length
}

export function getPublishedInvitationCountBySpecialty(specialtyId: SpecialtyId) {
  return getStoredInvitations().filter((invitation) => {
    return (
      invitation.status === 'published' &&
      invitation.targetSpecialtyIds.includes(specialtyId)
    )
  }).length
}

export function getReferenceDate() {
  return new Date(REFERENCE_DATE)
}

function sortInvitations(left: Invitation, right: Invitation) {
  const leftTimingStatus = getInvitationTimingStatus(left)
  const rightTimingStatus = getInvitationTimingStatus(right)

  if (leftTimingStatus !== rightTimingStatus) {
    return leftTimingStatus === 'upcoming' ? -1 : 1
  }

  const leftTime = new Date(`${left.scheduledDate}T${left.startTime}:00`).getTime()
  const rightTime = new Date(`${right.scheduledDate}T${right.startTime}:00`).getTime()

  return leftTime - rightTime
}

function formatTime(value: string) {
  const normalizedValue = normalizeTimeValue(value)
  const [hours, minutes] = normalizedValue.split(':').map(Number)
  const date = new Date('2026-08-03T00:00:00')
  date.setHours(hours, minutes, 0, 0)

  return new Intl.DateTimeFormat('es-CO', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Bogota',
  }).format(date)
}

function normalizeInvitation(rawInvitation: unknown): Invitation {
  if (!rawInvitation || typeof rawInvitation !== 'object') {
    return invitationSeed[0]
  }

  const invitation = rawInvitation as Record<string, unknown>
  const rawScheduledDate =
    asString(invitation.scheduledDate) ??
    normalizeLegacyDate(asString(invitation.date)) ??
    '2026-08-05'
  const rawStartTime =
    normalizeTimeValue(asString(invitation.startTime) ?? asString(invitation.time) ?? '09:00')
  const rawEndTime = normalizeOptionalTimeValue(asString(invitation.endTime))

  return {
    id: asString(invitation.id) ?? createInvitationId(),
    title: asString(invitation.title) ?? 'Invitacion',
    description: asString(invitation.description) ?? '',
    scheduledDate: rawScheduledDate,
    startTime: rawStartTime,
    endTime: rawEndTime,
    locationLabel: asString(invitation.locationLabel) ?? 'Lugar',
    locationValue: asString(invitation.locationValue) ?? '',
    organizer: asString(invitation.organizer) ?? 'Equipo Eklipse',
    accent: normalizeAccent(asString(invitation.accent)),
    targetSpecialtyIds: normalizeSpecialtyIds(invitation.targetSpecialtyIds),
    status: normalizeEditorialStatus(asString(invitation.status), rawScheduledDate),
  }
}

function normalizeLegacyDate(value: string | null) {
  if (!value) {
    return null
  }

  const normalized = value.toLowerCase().trim()
  const match = normalized.match(/^(\d{1,2}) de ([a-záéíóú]+) de (\d{4})$/i)

  if (!match) {
    return null
  }

  const [, day, monthName, year] = match
  const monthIndex = monthNameToNumber(monthName)

  if (monthIndex === null) {
    return null
  }

  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(Number(day)).padStart(2, '0')}`
}

function normalizeTimeValue(value: string) {
  const trimmed = value.trim().toLowerCase()

  if (/^\d{2}:\d{2}$/.test(trimmed)) {
    return trimmed
  }

  const legacyMatch = trimmed.match(/^(\d{1,2}):(\d{2})\s*([ap])\.\s*m\.$/)

  if (!legacyMatch) {
    return '09:00'
  }

  const [, rawHours, rawMinutes, meridiem] = legacyMatch
  let hours = Number(rawHours)
  const minutes = Number(rawMinutes)

  if (meridiem === 'p' && hours < 12) {
    hours += 12
  }

  if (meridiem === 'a' && hours === 12) {
    hours = 0
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function normalizeOptionalTimeValue(value: string | null) {
  if (!value) {
    return undefined
  }

  return normalizeTimeValue(value)
}

function normalizeEditorialStatus(value: string | null, scheduledDate: string): InvitationEditorialStatus {
  if (value === 'draft' || value === 'published' || value === 'archived') {
    return value
  }

  if (value === 'upcoming' || value === 'past') {
    return 'published'
  }

  return scheduledDate >= '2026-08-03' ? 'published' : 'published'
}

function normalizeAccent(value: string | null): Invitation['accent'] {
  if (value === 'purple' || value === 'amber' || value === 'rose' || value === 'teal') {
    return value
  }

  return 'teal'
}

function normalizeSpecialtyIds(value: unknown): SpecialtyId[] {
  if (!Array.isArray(value)) {
    return ['oncologia', 'cardiologia', 'nutricion', 'bienestar']
  }

  const normalized = value.filter(
    (entry): entry is SpecialtyId =>
      entry === 'oncologia' ||
      entry === 'cardiologia' ||
      entry === 'nutricion' ||
      entry === 'bienestar',
  )

  return normalized.length > 0
    ? normalized
    : ['oncologia', 'cardiologia', 'nutricion', 'bienestar']
}

function monthNameToNumber(value: string) {
  const months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ]

  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
  const index = months.indexOf(normalized)
  return index >= 0 ? index : null
}

function asString(value: unknown) {
  return typeof value === 'string' ? value : null
}
