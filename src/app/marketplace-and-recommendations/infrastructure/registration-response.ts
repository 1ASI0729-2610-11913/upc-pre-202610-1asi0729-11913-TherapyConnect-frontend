import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface RegistrationResponse extends BaseResponse {
  registrations: RegistrationResource[];
}

export interface RegistrationResource extends BaseResource {
  id: number;
  registrationState: string;
  registrationDate: string;
  accessState: string;
  accessDate: string;
}
