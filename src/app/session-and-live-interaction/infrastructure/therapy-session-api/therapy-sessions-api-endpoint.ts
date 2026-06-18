import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BaseApiEndpoint } from '../../../shared/infrastructure/base-api-endpoint';
import { TherapySession } from '../../domain/model/therapy-session.entity';
import { TherapySessionAssembler } from './therapy-session-assembler';
import { TherapySessionResource, TherapySessionsResponse } from './therapy-sessions-response';

export class TherapySessionsApiEndpoint extends BaseApiEndpoint<
  TherapySession,
  TherapySessionResource,
  TherapySessionsResponse,
  TherapySessionAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderTherapySessionsEndpointPath}`,
      new TherapySessionAssembler(),
    );
  }
}
