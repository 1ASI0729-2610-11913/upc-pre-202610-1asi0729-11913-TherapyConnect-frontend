import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { TeacherNote } from '../domain/model/teacher-note.entity';
import { TeacherNoteAssembler } from './teacher-note-assembler';
import { TeacherNoteResource, TeacherNotesResponse } from './teacher-notes-response';

export class TeacherNotesApiEndpoint extends BaseApiEndpoint<
  TeacherNote,
  TeacherNoteResource,
  TeacherNotesResponse,
  TeacherNoteAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderTeacherNotesEndpointPath}`,
      new TeacherNoteAssembler(),
    );
  }
}
