import { TeacherInstitutionalNote } from '../domain/model/teacher-institutional-note.entity';
import {
  TeacherInstitutionalNoteResource,
  TeacherInstitutionalNotesResponse,
} from './teacher-institutional-notes-response';

export class TeacherInstitutionalNoteAssembler {
  static toEntitiesFromResponse(
    response: TeacherInstitutionalNotesResponse,
  ): TeacherInstitutionalNote[] {
    return response.institutionalTeacherNotes.map((r) => this.toEntityFromResource(r));
  }

  static toEntitiesFromResources(
    resources: TeacherInstitutionalNoteResource[],
  ): TeacherInstitutionalNote[] {
    return resources.map((r) => this.toEntityFromResource(r));
  }

  static toEntityFromResource(resource: TeacherInstitutionalNoteResource): TeacherInstitutionalNote {
    return new TeacherInstitutionalNote({
      id: resource.id,
      studentName: resource.studentName ?? '',
      date: resource.date ?? '',
      categories: resource.categories ?? [],
      content: resource.content ?? '',
      sessionInfo: resource.sessionInfo ?? '',
    });
  }

  static toResourceFromEntity(entity: TeacherInstitutionalNote): TeacherInstitutionalNoteResource {
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
