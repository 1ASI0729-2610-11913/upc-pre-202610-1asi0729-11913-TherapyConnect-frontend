import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface EvaluationResponse extends BaseResponse {
  evaluations: EvaluationResource[];
}

export interface EvaluationResource extends BaseResource {
  id: number;
  courseId: number | null;
  evaluationState: string;
  evaluationScore: number;
  answer: string;
  certificationState: string;
}
