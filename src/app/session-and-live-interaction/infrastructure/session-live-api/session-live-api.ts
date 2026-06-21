import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseApi } from '../../../shared/infrastructure/base-api';
import { SessionChecklistItem } from '../../domain/model/session-checklist.entity';
import { TherapySession, SessionType, SessionStatus } from '../../domain/model/therapy-session.entity';
import { SessionChecklistApiEndpoint } from './session-checklist-api-endpoint';
import { TherapySessionsApiEndpoint } from '../therapy-session-api/therapy-sessions-api-endpoint';

interface SessionEventDto {
  id: number;
  sessionId?: number;
  teacherId?: number;
  title?: string;
  description?: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  eventType?: string;
}

/**
 * Fachada HTTP del bounded context session-and-live-interaction.
 */
@Injectable({ providedIn: 'root' })
export class SessionLiveApi extends BaseApi {
  private readonly therapySessionsEndpoint: TherapySessionsApiEndpoint;
  private readonly sessionChecklistEndpoint: SessionChecklistApiEndpoint;
  private readonly baseUrl = environment.platformProviderApiBaseUrl;
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    super();
    this.http = http;
    this.therapySessionsEndpoint = new TherapySessionsApiEndpoint(http);
    this.sessionChecklistEndpoint = new SessionChecklistApiEndpoint(http);
  }

  getSessions(): Observable<TherapySession[]> {
    return this.therapySessionsEndpoint.getAll();
  }

  getSessionEventsByTeacher(teacherId: number): Observable<TherapySession[]> {
    const events$ = this.http.get<SessionEventDto[]>(
      `${this.baseUrl}/api/v1/session-events/teacher/${teacherId}`
    ).pipe(
      map((events) => events.map((e) => this.mapEventToSession(e))),
      catchError(() => of([] as TherapySession[])),
    );
    const sessions$ = this.therapySessionsEndpoint.getAll().pipe(
      catchError(() => of([] as TherapySession[])),
    );
    return forkJoin([events$, sessions$]).pipe(
      map(([events, sessions]) => this.mergeUnique([...events, ...sessions])),
    );
  }

  getAllSessionEvents(): Observable<TherapySession[]> {
    const events$ = this.http.get<SessionEventDto[]>(
      `${this.baseUrl}/api/v1/session-events`
    ).pipe(
      map((events) => events.map((e) => this.mapEventToSession(e))),
      catchError(() => of([] as TherapySession[])),
    );
    const sessions$ = this.therapySessionsEndpoint.getAll().pipe(
      catchError(() => of([] as TherapySession[])),
    );
    return forkJoin([events$, sessions$]).pipe(
      map(([events, sessions]) => this.mergeUnique([...events, ...sessions])),
    );
  }

  private mergeUnique(sessions: TherapySession[]): TherapySession[] {
    const seen = new Set<number>();
    return sessions.filter((s) => {
      if (seen.has(s.id)) return false;
      seen.add(s.id);
      return true;
    });
  }

  getChecklist(): Observable<SessionChecklistItem[]> {
    return this.sessionChecklistEndpoint.getAll();
  }

  private mapEventToSession(e: SessionEventDto): TherapySession {
    const start = e.startTime ?? '00:00';
    const end = e.endTime ?? '00:00';
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const durationMinutes = Math.max(0, (eh * 60 + em) - (sh * 60 + sm));

    const dateObj = e.eventDate ? new Date(e.eventDate) : new Date();
    const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const typeRaw = (e.eventType ?? '').toUpperCase();
    const type: SessionType =
      typeRaw === 'GROUP' || typeRaw === 'GRUPAL' ? 'group' : 'private';

    return new TherapySession({
      id: e.id,
      patientName: e.title ?? e.description ?? `Sesión ${e.id}`,
      patientAge: 0,
      conditionLabel: e.eventType ?? '',
      parentName: '',
      professionalName: e.teacherId ? `Profesor ${e.teacherId}` : '',
      classroomName: '',
      dateLabel: e.eventDate ?? '',
      weekdayLabel: weekdays[dateObj.getDay()] ?? '',
      startTime: start,
      endTime: end,
      durationMinutes,
      type,
      modality: 'presential',
      status: 'scheduled' as SessionStatus,
      accessType: 'premium',
      observationsCount: 0,
    });
  }
}
