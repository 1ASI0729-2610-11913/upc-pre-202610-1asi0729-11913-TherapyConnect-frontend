import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { AUTH_USER_ID_STORAGE_KEY } from '../../iam/infrastructure/authentication-api/authentication-api';
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
      date: resource.date ?? resource.noteDate ?? '',
      categories: resource.categories ?? [this.toDisplayCondition(resource.conditionType)].filter(Boolean) as string[],
      content: resource.content ?? '',
      sessionInfo: resource.sessionInfo ?? resource.conditionDescription ?? '',
    });
  }


  toResourceFromEntity(entity: TeacherNote): TeacherNoteResource {
    return {
      id: entity.id,
      noteDate: entity.date,
      conditionType: this.toBackendCondition(entity.categories[0]),
      conditionDescription: entity.sessionInfo,
      authorProfileId: this.currentUserIdOr(3),
      sessionId: Number(entity.sessionInfo) || 1,
      teacherNoteType: entity.categories[1] ?? 'PERSONAL',
      studentName: entity.studentName,
      date: entity.date,
      categories: entity.categories,
      content: entity.content,
      sessionInfo: entity.sessionInfo,
    };
  }

  private toBackendCondition(value?: string): string {
    switch (value) {
      case 'TDAH':
        return 'ADHD';
      case 'Asperger':
        return 'ASPERGER';
      default:
        return 'OTHER';
    }
  }

  private toDisplayCondition(value?: string): string {
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

  private currentUserIdOr(fallback: number): number {
    const raw = localStorage.getItem(AUTH_USER_ID_STORAGE_KEY);
    return raw ? Number(raw) : fallback;
  }
}
