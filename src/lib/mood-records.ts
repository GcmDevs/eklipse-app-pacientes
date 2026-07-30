import { defaultMockPatient } from '@/data/mockPatient'
import type { MoodRecord } from '@/types/mood'

export const MOOD_RECORDS_STORAGE_KEY = 'eklipse_mood_records'

export function getMoodRecords() {
  const raw = localStorage.getItem(MOOD_RECORDS_STORAGE_KEY)

  if (!raw) {
    return [] as MoodRecord[]
  }

  try {
    const parsed = JSON.parse(raw) as MoodRecord[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    localStorage.removeItem(MOOD_RECORDS_STORAGE_KEY)
    return [] as MoodRecord[]
  }
}

export function saveMoodRecord(record: MoodRecord) {
  const records = getMoodRecords()
  localStorage.setItem(
    MOOD_RECORDS_STORAGE_KEY,
    JSON.stringify([record, ...records]),
  )
}

export function getTodayMoodRecord(patientId = defaultMockPatient.id) {
  const today = new Date()

  return getMoodRecords().find((record) => {
    if (record.patientId !== patientId) {
      return false
    }

    const createdAt = new Date(record.createdAt)

    return (
      createdAt.getFullYear() === today.getFullYear() &&
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getDate() === today.getDate()
    )
  })
}
