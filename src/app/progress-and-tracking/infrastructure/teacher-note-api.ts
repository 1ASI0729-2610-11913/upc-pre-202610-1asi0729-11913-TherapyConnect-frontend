import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { TeacherNote } from '../domain/model/teacher-note.entity';
import { TeacherNotesApiEndpoint } from './teacher-notes-api-endpoint';

/**
 * Fachada HTTP del bounded context progress-and-tracking para apuntes del profesor.
 */
@Injectable({ providedIn: 'root' })
export class TeacherNoteApi extends BaseApi {
  private readonly notesEndpoint: TeacherNotesApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.notesEndpoint = new TeacherNotesApiEndpoint(http);
  }

  list(): Observable<TeacherNote[]> {
    return this.notesEndpoint.getAll();
  }

  createFromDomain(entity: TeacherNote): Observable<TeacherNote> {
    return this.notesEndpoint.create(entity);
  }

  updateFromDomain(id: number, entity: TeacherNote): Observable<TeacherNote> {
    return this.notesEndpoint.update(entity, id);
  }

  delete(id: number): Observable<void> {
    return this.notesEndpoint.delete(id);
  }
}
