import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

//export type State = 'to start' | 'in progress' | 'on pause' | 'filled';

export interface DependentResponse extends BaseResponse {
  dependents: DependentResource[];
}

export interface DependentResource extends BaseResource {
  id: number;
  dependentCondition: string;
  needLevel: string;
  progressSate: string;
}
