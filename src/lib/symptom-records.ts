import { defaultMockPatient } from '@/data/mockPatient'
import type { SymptomRecord } from '@/types/symptoms'

export const SYMPTOM_RECORDS_STORAGE_KEY = 'eklipse_symptom_records'

export function getSymptomRecords() {
  const raw = localStorage.getItem(SYMPTOM_RECORDS_STORAGE_KEY)

  if (!raw) {
    return [] as SymptomRecord[]
  }

  try {
    const parsed = JSON.parse(raw) as SymptomRecord[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    localStorage.removeItem(SYMPTOM_RECORDS_STORAGE_KEY)
    return [] as SymptomRecord[]
  }
}

export function saveSymptomRecord(record: SymptomRecord) {
  const current = getSymptomRecords()
  localStorage.setItem(
    SYMPTOM_RECORDS_STORAGE_KEY,
    JSON.stringify([record, ...current]),
  )
}

export function createSymptomRecordId() {
  return `symptom-${crypto.randomUUID()}`
}

export function getPatientSymptomRecords(patientId = defaultMockPatient.id) {
  return getSymptomRecords().filter((record) => record.patientId === patientId)
}
