import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface ObservationResponse extends BaseResponse {
  observations: ObservationResource[];
}

export interface ObservationResource extends BaseResource {
  id: number;
  observationType: string;
  observationDescription: string;
}
