import { BaseAssembler } from '../../../shared/infrastructure/base-assembler';
import { SessionChecklistItem } from '../../domain/model/session-checklist.entity';
import { SessionChecklistItemResource, SessionChecklistResponse } from './session-checklist-response';

export class SessionChecklistAssembler
  implements BaseAssembler<SessionChecklistItem, SessionChecklistItemResource, SessionChecklistResponse>
{
  toEntitiesFromResponse(response: SessionChecklistResponse): SessionChecklistItem[] {
    return response.sessionChecklist.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: SessionChecklistItemResource): SessionChecklistItem {
    return new SessionChecklistItem({
      id: resource.id,
      groupTitle: resource.groupTitle ?? `Sesion ${resource.sessionId ?? ''}`.trim(),
      label: resource.label ?? resource.remarks ?? resource.attendanceStatus ?? 'Asistencia registrada',
      checked: resource.checked ?? resource.attendanceStatus === 'PRESENT',
    });
  }

  toResourceFromEntity(entity: SessionChecklistItem): SessionChecklistItemResource {
    return {
      id: entity.id,
      groupTitle: entity.groupTitle,
      label: entity.label,
      checked: entity.checked,
    };
  }
}
