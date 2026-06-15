import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Evento } from '../domain/model/evento.entity';
import { EventoResource, EventosResponse } from './eventos-response';

export class EventoAssembler implements BaseAssembler<Evento, EventoResource, EventosResponse> {
  toEntitiesFromResponse(response: EventosResponse): Evento[] {
    return response.eventos.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: EventoResource): Evento {
    return new Evento({
      id: resource.id,
      titulo: resource.titulo,
      fechaSesion: resource.fechaSesion,
      horaInicio: resource.horaInicio,
      horaFin: resource.horaFin,
      tipoSesion: resource.tipoSesion,
      estadoEvento: resource.estadoEvento,
      profesorId: resource.profesorId,
      estudianteId: resource.estudianteId ?? null,
      aulaId: resource.aulaId ?? null,
    });
  }

  toResourceFromEntity(entity: Evento): EventoResource {
    return {
      id: entity.id,
      titulo: entity.titulo,
      fechaSesion: entity.fechaSesion,
      horaInicio: entity.horaInicio,
      horaFin: entity.horaFin,
      tipoSesion: entity.tipoSesion,
      estadoEvento: entity.estadoEvento,
      profesorId: entity.profesorId,
      estudianteId: entity.estudianteId,
      aulaId: entity.aulaId,
    };
  }
}
