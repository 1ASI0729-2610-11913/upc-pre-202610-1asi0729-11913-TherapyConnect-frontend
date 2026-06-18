import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TeacherInstitutionalNote } from '../domain/model/teacher-institutional-note.entity';
import { TeacherInstitutionalNoteAssembler } from './teacher-institutional-note-assembler';
import {
  TeacherInstitutionalNoteResource,
  TeacherInstitutionalNotesResponse,
} from './teacher-institutional-notes-response';

/**
 * Gateway HTTP para apuntes de profesor institucional.
 */
@Injectable({ providedIn: 'root' })
export class TeacherInstitutionalNoteApi {
  private baseUrl = environment.platformProviderApiBaseUrl;
  private endpoint = environment.platformProviderInstitutionalTeacherNotesEndpointPath;
  private http = inject(HttpClient);

  getNotes(): Observable<TeacherInstitutionalNote[]> {
    return this.http
      .get<TeacherInstitutionalNotesResponse | TeacherInstitutionalNoteResource[]>(
        `${this.baseUrl}${this.endpoint}`,
      )
      .pipe(
        map((response) =>
          Array.isArray(response)
            ? TeacherInstitutionalNoteAssembler.toEntitiesFromResources(response)
            : TeacherInstitutionalNoteAssembler.toEntitiesFromResponse(response),
        ),
      );
  }

  createNote(entity: TeacherInstitutionalNote): Observable<TeacherInstitutionalNote> {
    const resource = TeacherInstitutionalNoteAssembler.toResourceFromEntity(entity);
    return this.http
      .post<TeacherInstitutionalNoteResource>(`${this.baseUrl}${this.endpoint}`, resource)
      .pipe(map((response) => TeacherInstitutionalNoteAssembler.toEntityFromResource(response)));
  }

  updateNote(id: number, entity: TeacherInstitutionalNote): Observable<TeacherInstitutionalNote> {
    const resource = TeacherInstitutionalNoteAssembler.toResourceFromEntity(entity);
    return this.http
      .put<TeacherInstitutionalNoteResource>(`${this.baseUrl}${this.endpoint}/${id}`, resource)
      .pipe(map((response) => TeacherInstitutionalNoteAssembler.toEntityFromResource(response)));
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${this.endpoint}/${id}`);
  }
}
