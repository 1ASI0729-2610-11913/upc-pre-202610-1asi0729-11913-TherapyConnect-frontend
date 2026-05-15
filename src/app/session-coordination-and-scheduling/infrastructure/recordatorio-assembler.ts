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
      titulo: resource.titulo,
      fechaRecordatorio: resource.fechaRecordatorio,
      horaRecordatorio: resource.horaRecordatorio,
      estadoRecordatorio: resource.estadoRecordatorio,
      eventoId: resource.eventoId,
    });
  }

  toResourceFromEntity(entity: Recordatorio): RecordatorioResource {
    return {
      id: entity.id,
      titulo: entity.titulo,
      fechaRecordatorio: entity.fechaRecordatorio,
      horaRecordatorio: entity.horaRecordatorio,
      estadoRecordatorio: entity.estadoRecordatorio,
      eventoId: entity.eventoId,
    };
  }
}
