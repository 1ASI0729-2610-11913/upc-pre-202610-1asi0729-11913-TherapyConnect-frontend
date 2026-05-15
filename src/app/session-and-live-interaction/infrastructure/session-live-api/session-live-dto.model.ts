export interface TherapySessionDto {
  id: string;
  patientName: string;
  patientAge: number;
  conditionLabel: string;
  parentName: string;
  professionalName: string;
  classroomName: string;
  dateLabel: string;
  weekdayLabel: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  type: string;
  modality: string;
  status: string;
  accessType: string;
  observationsCount: number;
}

export interface SessionChecklistItemDto {
  id: string;
  groupTitle: string;
  label: string;
  checked: boolean;
}
