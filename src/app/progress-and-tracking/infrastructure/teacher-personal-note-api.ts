import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TeacherPersonalNote } from '../domain/model/teacher-personal-note.entity';
import { TeacherPersonalNoteAssembler } from './teacher-personal-note-assembler';
import {
  TeacherPersonalNoteResource,
  TeacherPersonalNotesResponse,
} from './teacher-personal-notes-response';

/**
 * Gateway HTTP para apuntes de profesor en plan personal.
 */
@Injectable({ providedIn: 'root' })
export class TeacherPersonalNoteApi {
  private baseUrl = environment.platformProviderApiBaseUrl;
  private endpoint = environment.platformProviderPersonalTeacherNotesEndpointPath;
  private http = inject(HttpClient);

  getNotes(): Observable<TeacherPersonalNote[]> {
    return this.http
      .get<TeacherPersonalNotesResponse | TeacherPersonalNoteResource[]>(
        `${this.baseUrl}${this.endpoint}`,
      )
      .pipe(
        map((response) =>
          Array.isArray(response)
            ? TeacherPersonalNoteAssembler.toEntitiesFromResources(response)
            : TeacherPersonalNoteAssembler.toEntitiesFromResponse(response),
        ),
      );
  }

  createNote(entity: TeacherPersonalNote): Observable<TeacherPersonalNote> {
    const resource = TeacherPersonalNoteAssembler.toResourceFromEntity(entity);
    return this.http
      .post<TeacherPersonalNoteResource>(`${this.baseUrl}${this.endpoint}`, resource)
      .pipe(map((response) => TeacherPersonalNoteAssembler.toEntityFromResource(response)));
  }

  updateNote(id: number, entity: TeacherPersonalNote): Observable<TeacherPersonalNote> {
    const resource = TeacherPersonalNoteAssembler.toResourceFromEntity(entity);
    return this.http
      .put<TeacherPersonalNoteResource>(`${this.baseUrl}${this.endpoint}/${id}`, resource)
      .pipe(map((response) => TeacherPersonalNoteAssembler.toEntityFromResource(response)));
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${this.endpoint}/${id}`);
  }
}
