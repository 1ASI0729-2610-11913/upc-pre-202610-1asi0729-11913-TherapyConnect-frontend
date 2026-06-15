import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Registration } from '../domain/model/registration.entity';
import { RegistrationAssembler } from './registration-assembler';
import { RegistrationResource, RegistrationResponse } from './registration-response';

export class RegistrationsApiEndpoint extends BaseApiEndpoint<Registration, RegistrationResource, RegistrationResponse, RegistrationAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderRegistrationsEndpointPath}`,
      new RegistrationAssembler(),
    );
  }
}
