import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TeacherInstitutionalNote } from '../domain/model/teacher-institutional-note.entity';
import { TeacherInstitutionalNoteAssembler } from './teacher-institutional-note-assembler';
import { TeacherInstitutionalNoteResource } from './teacher-institutional-notes-response';

/**
 * Gateway HTTP para apuntes de profesor institucional.
 */
@Injectable({ providedIn: 'root' })
export class TeacherInstitutionalNoteApi {
  private baseUrl = environment.platformProviderApiBaseUrl;
  private endpoint = environment.platformProviderInstitutionalTeacherNotesEndpointPath;
  private commandEndpoint = environment.platformProviderTeacherNotesEndpointPath;
  private http = inject(HttpClient);

  getNotes(): Observable<TeacherInstitutionalNote[]> {
    const userId = this.currentUserId();
    const url = userId
      ? `${this.baseUrl}${this.endpoint}?authorProfileId=${userId}`
      : `${this.baseUrl}${this.commandEndpoint}`;

    return this.http
      .get<TeacherInstitutionalNoteResource[]>(url)
      .pipe(
        map((resources) =>
          TeacherInstitutionalNoteAssembler.toEntitiesFromResources(resources),
        ),
      );
  }

  private currentUserId(): number | null {
    const raw = localStorage.getItem('therapy-connect-auth-user-id');
    return raw ? Number(raw) : null;
  }

  createNote(entity: TeacherInstitutionalNote): Observable<TeacherInstitutionalNote> {
    const resource = TeacherInstitutionalNoteAssembler.toResourceFromEntity(entity);
    return this.http
      .post<TeacherInstitutionalNoteResource>(`${this.baseUrl}${this.commandEndpoint}`, resource)
      .pipe(map((response) => TeacherInstitutionalNoteAssembler.toEntityFromResource(response)));
  }

  updateNote(id: number, entity: TeacherInstitutionalNote): Observable<TeacherInstitutionalNote> {
    const resource = TeacherInstitutionalNoteAssembler.toResourceFromEntity(entity);
    return this.http
      .put<TeacherInstitutionalNoteResource>(`${this.baseUrl}${this.commandEndpoint}/${id}`, resource)
      .pipe(map((response) => TeacherInstitutionalNoteAssembler.toEntityFromResource(response)));
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${this.commandEndpoint}/${id}`);
  }
}
