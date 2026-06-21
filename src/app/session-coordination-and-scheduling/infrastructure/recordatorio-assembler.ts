import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Recordatorio } from '../domain/model/recordatorio.entity';
import { RecordatorioResource, RecordatoriosResponse } from './recordatorios-response';

export class RecordatorioAssembler implements BaseAssembler<Recordatorio, RecordatorioResource, RecordatoriosResponse> {
  toEntitiesFromResponse(response: RecordatoriosResponse): Recordatorio[] {
    return response.recordatorios.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: RecordatorioResource): Recordatorio {
    return new Recordatorio({
      id: resource.id,
      titulo: resource.titulo ?? resource.title ?? '',
      fechaRecordatorio: resource.fechaRecordatorio ?? resource.reminderDate ?? '',
      horaRecordatorio: resource.horaRecordatorio ?? resource.reminderTime ?? '',
      estadoRecordatorio: resource.estadoRecordatorio ?? resource.reminderStatus ?? 'PENDING',
      eventoId: resource.eventoId ?? resource.sessionId ?? 0,
    });
  }

  toResourceFromEntity(entity: Recordatorio): RecordatorioResource {
    return {
      id: entity.id,
      title: entity.titulo,
      reminderDate: entity.fechaRecordatorio,
      reminderTime: entity.horaRecordatorio,
      reminderStatus: entity.estadoRecordatorio,
      sessionId: entity.eventoId,
      titulo: entity.titulo,
      fechaRecordatorio: entity.fechaRecordatorio,
      horaRecordatorio: entity.horaRecordatorio,
      estadoRecordatorio: entity.estadoRecordatorio,
      eventoId: entity.eventoId,
    };
  }
}
