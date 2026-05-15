import { BaseResource } from '../../../shared/infrastructure/base-resource';

export type SessionType = 'private' | 'group';
export type SessionModality = 'presential' | 'virtual';
export type SessionStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
export type SessionAccessType = 'premium' | 'institutional';

export interface TherapySession extends BaseResource {
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
  type: SessionType;
  modality: SessionModality;
  status: SessionStatus;
  accessType: SessionAccessType;
  observationsCount: number;
}
