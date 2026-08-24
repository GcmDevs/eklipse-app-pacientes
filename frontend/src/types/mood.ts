export type MoodValue =
  'Tranquilo(a)' | 'Alegre' | 'Preocupado(a)' | 'Triste' | 'Cansado(a)' | 'Desmotivado(a)';

export type InfluenceValue =
  | 'Dolor fisico'
  | 'Cansancio'
  | 'Preocupacion por resultados'
  | 'Familia o red de apoyo'
  | 'Efectos del tratamiento'
  | 'Otro';

export type MoodRecord = {
  id: string;
  patientId: string;
  mood: MoodValue;
  influence: InfluenceValue;
  otherInfluence: string;
  comment: string;
  createdAt: string;
};
