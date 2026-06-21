import { TeacherInstitutionalNote } from '../domain/model/teacher-institutional-note.entity';
import { AUTH_USER_ID_STORAGE_KEY } from '../../iam/infrastructure/authentication-api/authentication-api';
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
      date: resource.date ?? resource.noteDate ?? '',
      categories: resource.categories ?? [this.toDisplayCondition(resource.conditionType)].filter(Boolean) as string[],
      content: resource.content ?? '',
      sessionInfo: resource.sessionInfo ?? resource.conditionDescription ?? '',
    });
  }

  static toResourceFromEntity(entity: TeacherInstitutionalNote): TeacherInstitutionalNoteResource {
    return {
      id: entity.id,
      noteDate: entity.date,
      conditionType: this.toBackendCondition(entity.categories[0]),
      conditionDescription: entity.sessionInfo,
      authorProfileId: this.currentUserIdOr(4),
      sessionId: Number(entity.sessionInfo) || 1,
      teacherNoteType: 'INSTITUTIONAL',
      studentName: entity.studentName,
      date: entity.date,
      categories: entity.categories,
      content: entity.content,
      sessionInfo: entity.sessionInfo,
    };
  }

  private static toBackendCondition(value?: string): string {
    switch (value) {
      case 'TDAH':
        return 'ADHD';
      case 'Asperger':
        return 'ASPERGER';
      default:
        return 'OTHER';
    }
  }

  private static toDisplayCondition(value?: string): string {
    switch (value) {
      case 'ADHD':
        return 'TDAH';
      case 'ASPERGER':
        return 'Asperger';
      case 'OTHER':
        return 'Other';
      default:
        return value ?? '';
    }
  }

  private static currentUserIdOr(fallback: number): number {
    const raw = localStorage.getItem(AUTH_USER_ID_STORAGE_KEY);
    return raw ? Number(raw) : fallback;
  }
}
