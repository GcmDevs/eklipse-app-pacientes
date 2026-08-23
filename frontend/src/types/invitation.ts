import type { SpecialtyId } from './specialty'

export type InvitationAccent = 'teal' | 'purple' | 'amber' | 'rose'

export type InvitationEditorialStatus = 'draft' | 'published' | 'archived'

export type Invitation = {
  id: string
  title: string
  description: string
  scheduledDate: string
  startTime: string
  endTime?: string
  locationLabel: string
  locationValue: string
  organizer: string
  accent: InvitationAccent
  targetSpecialtyIds: SpecialtyId[]
  status: InvitationEditorialStatus
}
