import { BaseResource, BaseResponse } from '../../../shared/infrastructure/base-response';

export interface TherapySessionsResponse extends BaseResponse {
  therapySessions: TherapySessionResource[];
}

export interface TherapySessionResource extends BaseResource {
  title?: string;
  sessionDate?: string;
  startTime?: string;
  endTime?: string;
  sessionType?: string;
  sessionStatus?: string;
  teacherId?: number;
  studentId?: number;
  patientName?: string;
  patientAge?: number;
  conditionLabel?: string;
  parentName?: string;
  professionalName?: string;
  classroomName?: string;
  dateLabel?: string;
  weekdayLabel?: string;
  durationMinutes?: number;
  type?: string;
  modality?: string;
  status?: string;
  accessType?: string;
  observationsCount?: number;
}
