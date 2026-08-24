import { mockPatients } from '@/data/mockPatient';
import { getReferenceDate } from '@/lib/invitations';
import { getMoodRecords } from '@/lib/mood-records';
import { getSymptomRecords } from '@/lib/symptom-records';
import type {
  AdminDashboardMetrics,
  MonitoringStatus,
  PatientMonitoringSummary,
} from '@/types/admin';
import type { MoodRecord } from '@/types/mood';
import type { SymptomRecord } from '@/types/symptoms';

const RECENT_REPORT_WINDOW_DAYS = 3;

export function getPatientMonitoringSummaries() {
  const moodRecords = getMoodRecords();
  const symptomRecords = getSymptomRecords();

  return mockPatients
    .map(patient => {
      const patientMoodRecords = moodRecords
        .filter(record => record.patientId === patient.id)
        .sort(compareDatesDesc);
      const patientSymptomRecords = symptomRecords
        .filter(record => record.patientId === patient.id)
        .sort(compareDatesDesc);

      const latestMoodRecord = patientMoodRecords[0] ?? null;
      const latestSymptomRecord = patientSymptomRecords[0] ?? null;
      const lastReportAt = getMostRecentDate(
        latestMoodRecord?.createdAt ?? null,
        latestSymptomRecord?.createdAt ?? null
      );

      return {
        patient,
        specialtyId: patient.specialtyId,
        specialtyLabel: patient.specialtyLabel,
        monitoringStatus: getMonitoringStatus(lastReportAt, latestSymptomRecord),
        latestMood: latestMoodRecord?.mood ?? null,
        latestInfluence: latestMoodRecord?.influence ?? null,
        latestSymptomName: latestSymptomRecord?.symptomName ?? null,
        latestSeverityLabel: latestSymptomRecord?.severityLabel ?? null,
        latestSeverityLevel: latestSymptomRecord?.severityLevel ?? null,
        lastReportAt,
      } satisfies PatientMonitoringSummary;
    })
    .sort((left, right) => {
      if (!left.lastReportAt) return 1;
      if (!right.lastReportAt) return -1;
      return new Date(right.lastReportAt).getTime() - new Date(left.lastReportAt).getTime();
    });
}

export function getAdminDashboardMetrics(): AdminDashboardMetrics {
  const summaries = getPatientMonitoringSummaries();
  const moodRecords = getMoodRecords();
  const symptomRecords = getSymptomRecords();
  const todayKey = toDateKey(getReferenceDate());

  const moodDistributionMap = moodRecords.reduce<Record<string, number>>((accumulator, record) => {
    accumulator[record.mood] = (accumulator[record.mood] ?? 0) + 1;
    return accumulator;
  }, {});

  const symptomCountMap = symptomRecords.reduce<Record<string, number>>((accumulator, record) => {
    accumulator[record.symptomName] = (accumulator[record.symptomName] ?? 0) + 1;
    return accumulator;
  }, {});

  const highestSeveritySymptoms = [...symptomRecords]
    .sort((left, right) => {
      if (right.severityLevel !== left.severityLevel) {
        return right.severityLevel - left.severityLevel;
      }

      return compareDatesDesc(left, right);
    })
    .slice(0, 5)
    .map(record => ({
      patientName:
        mockPatients.find(patient => patient.id === record.patientId)?.shortName ?? 'Paciente',
      symptomName: record.symptomName,
      severityLabel: record.severityLabel,
      severityLevel: record.severityLevel,
      createdAt: record.createdAt,
    }));

  return {
    totalPatients: summaries.length,
    patientsReportedToday: summaries.filter(
      summary => summary.lastReportAt && toDateKey(new Date(summary.lastReportAt)) === todayKey
    ).length,
    patientsMissingRecentReport: summaries.filter(
      summary => summary.monitoringStatus === 'stale' || summary.monitoringStatus === 'no-data'
    ).length,
    patientsNeedingAttention: summaries.filter(summary => summary.monitoringStatus === 'attention')
      .length,
    topSymptoms: Object.entries(symptomCountMap)
      .sort((left, right) => right[1] - left[1])
      .slice(0, 4)
      .map(([symptomName, count]) => ({ symptomName, count })),
    highestSeveritySymptoms,
    moodDistribution: Object.entries(moodDistributionMap)
      .sort((left, right) => right[1] - left[1])
      .map(([mood, count]) => ({
        mood: mood as MoodRecord['mood'],
        count,
      })),
  };
}

export function getPatientMonitoringDetail(patientId: string) {
  const patient = mockPatients.find(entry => entry.id === patientId) ?? null;

  if (!patient) {
    return null;
  }

  const moodHistory = getMoodRecords()
    .filter(record => record.patientId === patientId)
    .sort(compareDatesDesc);
  const symptomHistory = getSymptomRecords()
    .filter(record => record.patientId === patientId)
    .sort(compareDatesDesc);
  const summary =
    getPatientMonitoringSummaries().find(entry => entry.patient.id === patientId) ?? null;

  return {
    patient,
    moodHistory,
    symptomHistory,
    summary,
  };
}

function getMonitoringStatus(
  lastReportAt: string | null,
  latestSymptomRecord: SymptomRecord | null
): MonitoringStatus {
  if (!lastReportAt) {
    return 'no-data';
  }

  if (latestSymptomRecord && latestSymptomRecord.severityLevel >= 3) {
    return 'attention';
  }

  const difference = getDifferenceInDays(lastReportAt);
  if (difference > RECENT_REPORT_WINDOW_DAYS) {
    return 'stale';
  }

  return 'stable';
}

function getMostRecentDate(left: string | null, right: string | null) {
  if (!left) return right;
  if (!right) return left;

  return new Date(left).getTime() >= new Date(right).getTime() ? left : right;
}

function getDifferenceInDays(dateValue: string) {
  const today = getReferenceDate();
  const target = new Date(dateValue);
  const difference = today.getTime() - target.getTime();
  return Math.floor(difference / (1000 * 60 * 60 * 24));
}

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function compareDatesDesc(
  left: Pick<MoodRecord | SymptomRecord, 'createdAt'>,
  right: Pick<MoodRecord | SymptomRecord, 'createdAt'>
) {
  return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
}
