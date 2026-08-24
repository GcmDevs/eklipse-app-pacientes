export type BodyRegionId = 'oral' | 'respiratory' | 'digestive' | 'urinary' | 'skin';

export type BodyRegionCode = 1 | 2 | 3 | 4 | 5;

export type SeverityOption = {
  id: number;
  label: string;
  summaryLabel: string;
  severityLevel: number;
};

export type SymptomDefinition = {
  id: number;
  name: string;
  regionId: BodyRegionId;
  regionCode: BodyRegionCode;
  regionName: string;
  intensities: SeverityOption[];
};

export type BodyRegion = {
  id: BodyRegionId;
  code: BodyRegionCode;
  label: string;
  description: string;
  bodyArea: string;
};

export type SymptomAnswerMap = Record<string, string>;

export type SymptomRecord = {
  id: string;
  patientId: string;
  symptomId: number;
  symptomName: string;
  regionId: BodyRegionId;
  regionCode: BodyRegionCode;
  severityId: number;
  severityLabel: string;
  severityLevel: number;
  answers: SymptomAnswerMap;
  createdAt: string;
};
