import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { TeacherNote } from '../domain/model/teacher-note.entity';
import { TeacherNoteResource, TeacherNotesResponse } from './teacher-notes-response';

export class TeacherNoteAssembler implements BaseAssembler<TeacherNote, TeacherNoteResource, TeacherNotesResponse> {
  toEntitiesFromResponse(response: TeacherNotesResponse): TeacherNote[] {
    return response.teacherNotes.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: TeacherNoteResource): TeacherNote {
    return new TeacherNote({
      id: resource.id,
      studentName: resource.studentName ?? '',
      date: resource.date ?? '',
      categories: resource.categories ?? [],
      content: resource.content ?? '',
      sessionInfo: resource.sessionInfo ?? '',
    });
  }

  toResourceFromEntity(entity: TeacherNote): TeacherNoteResource {
    return {
      id: entity.id,
      studentName: entity.studentName,
      date: entity.date,
      categories: entity.categories,
      content: entity.content,
      sessionInfo: entity.sessionInfo,
    };
  }
}
