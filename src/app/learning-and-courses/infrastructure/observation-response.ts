import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface ObservationResponse extends BaseResponse {
  observations: ObservationResource[];
}

export interface ObservationResource extends BaseResource {
  id: number;
  sessionId?: number;
  studentId?: number;
  teacherId?: number;
  observationText?: string;
  observationDate?: string;
  progressRating?: number;
  observationType?: string;
  observationDescription?: string;
}
