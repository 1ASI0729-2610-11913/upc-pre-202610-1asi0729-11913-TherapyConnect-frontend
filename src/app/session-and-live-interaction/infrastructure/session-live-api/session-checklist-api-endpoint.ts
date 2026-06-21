import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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

  override getAll(): Observable<SessionChecklistItem[]> {
    return this.http
      .get<SessionChecklistItemResource[]>(`${this.endpointUrl}/student/1`)
      .pipe(
        map((response) => response.map((resource) => this.assembler.toEntityFromResource(resource))),
        catchError(this.handleError('Failed to fetch session attendance')),
      );
  }
}
