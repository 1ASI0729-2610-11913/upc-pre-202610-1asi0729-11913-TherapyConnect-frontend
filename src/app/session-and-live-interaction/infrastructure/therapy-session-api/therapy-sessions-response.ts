import { BaseResource, BaseResponse } from '../../../shared/infrastructure/base-response';

export interface TherapySessionsResponse extends BaseResponse {
  therapySessions: TherapySessionResource[];
}

export interface TherapySessionResource extends BaseResource {
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
