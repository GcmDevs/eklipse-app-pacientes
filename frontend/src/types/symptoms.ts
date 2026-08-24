export type BodyRegionId = 'oral' | 'respiratory' | 'digestive' | 'urinary' | 'skin';

export type QuickAccessId = 'pain' | 'nausea' | 'fatigue' | 'fever';

export type SymptomQuestionOption = {
  value: string;
  label: string;
  summaryLabel: string;
};

export type SymptomQuestion = {
  id: string;
  prompt: string;
  type: 'single-choice';
  options: SymptomQuestionOption[];
};

export type SeverityOption = {
  id: string;
  label: string;
  summaryLabel: string;
  severityLevel: number;
};

export type SymptomDefinition = {
  id: string;
  name: string;
  searchTerms: string[];
  icon: string;
  regionId: BodyRegionId;
  quickAccessIds: QuickAccessId[];
  severityId: string;
  questionIds: string[];
  successMessage: string;
};

export type BodyRegion = {
  id: BodyRegionId;
  label: string;
  description: string;
  bodyArea: string;
};

export type QuickAccess = {
  id: QuickAccessId;
  label: string;
  description: string;
  icon: string;
};

export type SymptomAnswerMap = Record<string, string>;

export type SymptomRecord = {
  id: string;
  patientId: string;
  symptomId: string;
  symptomName: string;
  regionId: BodyRegionId;
  severityId: string;
  severityLabel: string;
  severityLevel: number;
  answers: SymptomAnswerMap;
  createdAt: string;
};
