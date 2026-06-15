import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BaseApiEndpoint } from '../../../shared/infrastructure/base-api-endpoint';
import { SessionChecklistItem } from '../../domain/model/session-checklist.entity';
import { SessionChecklistAssembler } from './session-checklist-assembler';
import { SessionChecklistItemResource, SessionChecklistResponse } from './session-checklist-response';

export class SessionChecklistApiEndpoint extends BaseApiEndpoint<
  SessionChecklistItem,
  SessionChecklistItemResource,
  SessionChecklistResponse,
  SessionChecklistAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderSessionChecklistEndpointPath}`,
      new SessionChecklistAssembler(),
    );
  }
}
