import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observation } from '../domain/model/observation.entity';
import { ObservationAssembler } from './observation-assembler';
import { ObservationResource, ObservationResponse } from './observation-response';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';

export class ObservationsApiEndpoint extends BaseApiEndpoint<Observation, ObservationResource, ObservationResponse, ObservationAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderObservationsEndpointPath}`,
      new ObservationAssembler(),
    );
  }
}
