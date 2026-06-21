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
      titulo: resource.titulo ?? resource.title ?? '',
      fechaSesion: resource.fechaSesion ?? resource.eventDate ?? '',
      horaInicio: resource.horaInicio ?? resource.startTime ?? '',
      horaFin: resource.horaFin ?? resource.endTime ?? '',
      tipoSesion: this.toFormEventType(resource.tipoSesion ?? resource.eventType ?? ''),
      estadoEvento: resource.estadoEvento ?? 'SCHEDULED',
      profesorId: resource.profesorId ?? resource.teacherId ?? 0,
      estudianteId: resource.estudianteId ?? null,
      aulaId: resource.aulaId ?? null,
    });
  }

  toResourceFromEntity(entity: Evento): EventoResource {
    return {
      id: entity.id,
      sessionId: entity.id > 0 ? entity.id : undefined,
      teacherId: entity.profesorId,
      title: entity.titulo,
      description: entity.titulo,
      eventDate: entity.fechaSesion,
      startTime: entity.horaInicio,
      endTime: entity.horaFin,
      eventType: this.toApiEventType(entity.tipoSesion),
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

  private toApiEventType(value: string): string {
    const normalized = value.toLowerCase();
    const eventTypes: Record<string, string> = {
      privada: 'PRIVATE_SESSION',
      private_session: 'PRIVATE_SESSION',
      grupal: 'GROUP_SESSION',
      group_session: 'GROUP_SESSION',
      emergencia: 'OTHER',
      other: 'OTHER',
      live_class: 'LIVE_CLASS',
      meeting: 'MEETING',
    };
    return eventTypes[normalized] ?? value.toUpperCase();
  }

  private toFormEventType(value: string): string {
    const normalized = value.toUpperCase();
    const eventTypes: Record<string, string> = {
      PRIVATE_SESSION: 'privada',
      GROUP_SESSION: 'grupal',
      OTHER: 'emergencia',
      LIVE_CLASS: 'grupal',
      MEETING: 'grupal',
    };
    return eventTypes[normalized] ?? value.toLowerCase();
  }
}
