import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TeacherPersonalNote } from '../domain/model/teacher-personal-note.entity';
import { TeacherPersonalNoteAssembler } from './teacher-personal-note-assembler';
import { TeacherPersonalNoteResource } from './teacher-personal-notes-response';

/**
 * Gateway HTTP para apuntes de profesor en plan personal.
 */
@Injectable({ providedIn: 'root' })
export class TeacherPersonalNoteApi {
  private baseUrl = environment.platformProviderApiBaseUrl;
  private endpoint = environment.platformProviderPersonalTeacherNotesEndpointPath;
  private commandEndpoint = environment.platformProviderTeacherNotesEndpointPath;
  private http = inject(HttpClient);

  getNotes(): Observable<TeacherPersonalNote[]> {
    const userId = this.currentUserId();
    const url = userId
      ? `${this.baseUrl}${this.endpoint}?authorProfileId=${userId}`
      : `${this.baseUrl}${this.commandEndpoint}`;

    return this.http
      .get<TeacherPersonalNoteResource[]>(url)
      .pipe(
        map((resources) =>
          TeacherPersonalNoteAssembler.toEntitiesFromResources(resources),
        ),
      );
  }

  private currentUserId(): number | null {
    const raw = localStorage.getItem('therapy-connect-auth-user-id');
    return raw ? Number(raw) : null;
  }

  createNote(entity: TeacherPersonalNote): Observable<TeacherPersonalNote> {
    const resource = TeacherPersonalNoteAssembler.toResourceFromEntity(entity);
    return this.http
      .post<TeacherPersonalNoteResource>(`${this.baseUrl}${this.commandEndpoint}`, resource)
      .pipe(map((response) => TeacherPersonalNoteAssembler.toEntityFromResource(response)));
  }

  updateNote(id: number, entity: TeacherPersonalNote): Observable<TeacherPersonalNote> {
    const resource = TeacherPersonalNoteAssembler.toResourceFromEntity(entity);
    return this.http
      .put<TeacherPersonalNoteResource>(`${this.baseUrl}${this.commandEndpoint}/${id}`, resource)
      .pipe(map((response) => TeacherPersonalNoteAssembler.toEntityFromResource(response)));
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${this.commandEndpoint}/${id}`);
  }
}
