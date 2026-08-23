import type { InfluenceValue, MoodValue } from './mood'
import type { Patient } from './patient'
import type { SpecialtyId } from './specialty'

export type MonitoringStatus = 'stable' | 'attention' | 'stale' | 'no-data'

export type PatientMonitoringSummary = {
  patient: Patient
  specialtyId: SpecialtyId
  specialtyLabel: string
  monitoringStatus: MonitoringStatus
  latestMood: MoodValue | null
  latestInfluence: InfluenceValue | null
  latestSymptomName: string | null
  latestSeverityLabel: string | null
  latestSeverityLevel: number | null
  lastReportAt: string | null
}

export type AdminDashboardMetrics = {
  totalPatients: number
  patientsReportedToday: number
  patientsMissingRecentReport: number
  patientsNeedingAttention: number
  topSymptoms: Array<{
    symptomName: string
    count: number
  }>
  highestSeveritySymptoms: Array<{
    patientName: string
    symptomName: string
    severityLabel: string
    severityLevel: number
    createdAt: string
  }>
  moodDistribution: Array<{
    mood: MoodValue
    count: number
  }>
}
