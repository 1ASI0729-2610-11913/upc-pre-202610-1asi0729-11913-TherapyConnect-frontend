import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseApi } from '../../../shared/infrastructure/base-api';
import { SessionChecklistItem } from '../../domain/model/session-checklist.entity';
import { TherapySession } from '../../domain/model/therapy-session.entity';
import { SessionChecklistApiAssembler, TherapySessionApiAssembler } from './session-live-api-assembler';
import { SessionChecklistItemDto, TherapySessionDto } from './session-live-dto.model';

@Injectable({ providedIn: 'root' })
export class SessionLiveApi extends BaseApi {
  private readonly sessionAssembler = inject(TherapySessionApiAssembler);
  private readonly checklistAssembler = inject(SessionChecklistApiAssembler);

  getSessions(): Observable<TherapySession[]> {
    return this.getJson<TherapySessionDto[]>('/api/therapy-sessions').pipe(
      map((rows) => rows.map((dto) => this.sessionAssembler.toDomain(dto))),
    );
  }

  getChecklist(): Observable<SessionChecklistItem[]> {
    return this.getJson<SessionChecklistItemDto[]>('/api/session-checklist').pipe(
      map((rows) => rows.map((dto) => this.checklistAssembler.toDomain(dto))),
    );
  }
}
