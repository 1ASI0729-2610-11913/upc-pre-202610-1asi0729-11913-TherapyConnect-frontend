import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface DependentResponse extends BaseResponse {
  dependents: DependentResource[];
}

export interface DependentResource extends BaseResource {
  id: number;
  dependentCondition: string;
  needLevel: string;
  progressSate: string;
}
