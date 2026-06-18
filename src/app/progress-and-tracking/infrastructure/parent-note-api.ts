import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ParentNote } from '../domain/model/parent-note.entity';
import { ParentNoteAssembler } from './parent-note-assembler';
import { ParentNoteResource, ParentNotesResponse } from './parent-notes-response';

/**
 * Gateway HTTP para apuntes de padre de familia (Personal/Parent).
 */
@Injectable({ providedIn: 'root' })
export class ParentNoteApi {
  private baseUrl = environment.platformProviderApiBaseUrl;
  private endpoint = environment.platformProviderParentNotesEndpointPath;
  private http = inject(HttpClient);

  getNotes(): Observable<ParentNote[]> {
    return this.http
      .get<ParentNotesResponse | ParentNoteResource[]>(`${this.baseUrl}${this.endpoint}`)
      .pipe(
        map((response) =>
          Array.isArray(response)
            ? ParentNoteAssembler.toEntitiesFromResources(response)
            : ParentNoteAssembler.toEntitiesFromResponse(response),
        ),
      );
  }

  createNote(entity: ParentNote): Observable<ParentNote> {
    const resource = ParentNoteAssembler.toResourceFromEntity(entity);
    return this.http
      .post<ParentNoteResource>(`${this.baseUrl}${this.endpoint}`, resource)
      .pipe(map((response) => ParentNoteAssembler.toEntityFromResource(response)));
  }

  updateNote(id: number, entity: ParentNote): Observable<ParentNote> {
    const resource = ParentNoteAssembler.toResourceFromEntity(entity);
    return this.http
      .put<ParentNoteResource>(`${this.baseUrl}${this.endpoint}/${id}`, resource)
      .pipe(map((response) => ParentNoteAssembler.toEntityFromResource(response)));
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${this.endpoint}/${id}`);
  }
}
