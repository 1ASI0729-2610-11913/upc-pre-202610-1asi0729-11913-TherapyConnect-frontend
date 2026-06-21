import { ParentNote } from '../domain/model/parent-note.entity';
import { ParentNoteResource, ParentNotesResponse } from './parent-notes-response';
import { AUTH_USER_ID_STORAGE_KEY } from '../../iam/infrastructure/authentication-api/authentication-api';

export class ParentNoteAssembler {
  static toEntitiesFromResponse(response: ParentNotesResponse): ParentNote[] {
    return response.parentNotes.map((r) => this.toEntityFromResource(r));
  }

  static toEntitiesFromResources(resources: ParentNoteResource[]): ParentNote[] {
    return resources.map((r) => this.toEntityFromResource(r));
  }

  static toEntityFromResource(resource: ParentNoteResource): ParentNote {
    return new ParentNote({
      id: resource.id,
      childName: resource.childName ?? resource.conditionDescription ?? '',
      date: resource.date ?? resource.noteDate ?? '',
      categories: resource.categories ?? [this.toDisplayCondition(resource.conditionType)].filter(Boolean) as string[],
      content: resource.content ?? '',
      nextSteps: resource.nextSteps ?? '',
    });
  }

  static toResourceFromEntity(entity: ParentNote): ParentNoteResource {
    return {
      id: entity.id,
      noteDate: entity.date,
      conditionType: this.toBackendCondition(entity.categories[0]),
      conditionDescription: entity.childName || 'Sin nombre registrado',
      authorProfileId: this.currentUserIdOr(1),
      childName: entity.childName,
      date: entity.date,
      categories: entity.categories,
      content: entity.content,
      nextSteps: entity.nextSteps || 'Sin siguientes pasos registrados',
    };
  }

  private static toBackendCondition(value?: string): string {
    switch (value) {
      case 'TDAH':
        return 'ADHD';
      case 'Asperger':
        return 'ASPERGER';
      case 'OTHER':
      case 'Other':
        return 'OTHER';
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
