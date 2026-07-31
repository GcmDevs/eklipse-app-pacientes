export type Invitation = {
  id: string
  title: string
  description: string
  status: 'upcoming' | 'past'
  date: string
  time: string
  endTime?: string
  locationLabel: string
  locationValue: string
  organizer: string
  accent: 'teal' | 'purple' | 'amber' | 'rose'
}
