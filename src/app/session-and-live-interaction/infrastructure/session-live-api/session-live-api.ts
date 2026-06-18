import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../../shared/infrastructure/base-api';
import { SessionChecklistItem } from '../../domain/model/session-checklist.entity';
import { TherapySession } from '../../domain/model/therapy-session.entity';
import { SessionChecklistApiEndpoint } from './session-checklist-api-endpoint';
import { TherapySessionsApiEndpoint } from '../therapy-session-api/therapy-sessions-api-endpoint';

/**
 * Fachada HTTP del bounded context session-and-live-interaction.
 */
@Injectable({ providedIn: 'root' })
export class SessionLiveApi extends BaseApi {
  private readonly therapySessionsEndpoint: TherapySessionsApiEndpoint;
  private readonly sessionChecklistEndpoint: SessionChecklistApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.therapySessionsEndpoint = new TherapySessionsApiEndpoint(http);
    this.sessionChecklistEndpoint = new SessionChecklistApiEndpoint(http);
  }

  getSessions(): Observable<TherapySession[]> {
    return this.therapySessionsEndpoint.getAll();
  }

  getChecklist(): Observable<SessionChecklistItem[]> {
    return this.sessionChecklistEndpoint.getAll();
  }
}
