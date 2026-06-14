import { ParentNote } from '../domain/model/parent-note.entity';
import { ParentNoteResource, ParentNotesResponse } from './parent-notes-response';

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
      childName: resource.childName ?? '',
      date: resource.date ?? '',
      categories: resource.categories ?? [],
      content: resource.content ?? '',
      nextSteps: resource.nextSteps ?? '',
    });
  }

  static toResourceFromEntity(entity: ParentNote): ParentNoteResource {
    return {
      id: entity.id,
      childName: entity.childName,
      date: entity.date,
      categories: entity.categories,
      content: entity.content,
      nextSteps: entity.nextSteps,
    };
  }
}
