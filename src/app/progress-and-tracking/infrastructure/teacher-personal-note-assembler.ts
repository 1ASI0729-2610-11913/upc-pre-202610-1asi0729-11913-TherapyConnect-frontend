import { TeacherPersonalNote } from '../domain/model/teacher-personal-note.entity';
import {
  TeacherPersonalNoteResource,
  TeacherPersonalNotesResponse,
} from './teacher-personal-notes-response';

export class TeacherPersonalNoteAssembler {
  static toEntitiesFromResponse(response: TeacherPersonalNotesResponse): TeacherPersonalNote[] {
    return response.personalTeacherNotes.map((r) => this.toEntityFromResource(r));
  }

  static toEntitiesFromResources(
    resources: TeacherPersonalNoteResource[],
  ): TeacherPersonalNote[] {
    return resources.map((r) => this.toEntityFromResource(r));
  }

  static toEntityFromResource(resource: TeacherPersonalNoteResource): TeacherPersonalNote {
    return new TeacherPersonalNote({
      id: resource.id,
      studentName: resource.studentName ?? '',
      date: resource.date ?? '',
      categories: resource.categories ?? [],
      content: resource.content ?? '',
      sessionInfo: resource.sessionInfo ?? '',
    });
  }

  static toResourceFromEntity(entity: TeacherPersonalNote): TeacherPersonalNoteResource {
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
