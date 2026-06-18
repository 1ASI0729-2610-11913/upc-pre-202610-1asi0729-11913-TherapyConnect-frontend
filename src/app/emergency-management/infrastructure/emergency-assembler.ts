import { Injectable } from '@angular/core';
import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Emergency, EstadoEmergencia, NivelCriticidad } from '../domain/model/emergency.entity';
import { EmergenciesResponse, EmergencyResource } from './emergencies-response';

@Injectable({ providedIn: 'root' })
export class EmergencyAssembler implements BaseAssembler<Emergency, EmergencyResource, EmergenciesResponse> {
  toEntitiesFromResponse(response: EmergenciesResponse): Emergency[] {
    return response.emergencies.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: EmergencyResource): Emergency {
    return new Emergency({
      id: Number(resource.id),
      descripcion: resource.descripcion,
      estadoEmergencia: resource.estadoEmergencia as EstadoEmergencia,
      nivelCriticidad: resource.nivelCriticidad as NivelCriticidad,
      fechaActivacion: resource.fechaActivacion,
      pacienteId: Number(resource.pacienteId),
      pacienteNombre: resource.pacienteNombre,
      profesionalAsignado: resource.profesionalAsignado ?? null,
    });
  }

  toResourceFromEntity(entity: Emergency): EmergencyResource {
    return {
      id: Number(entity.id),
      descripcion: entity.descripcion,
      estadoEmergencia: entity.estadoEmergencia,
      nivelCriticidad: entity.nivelCriticidad,
      fechaActivacion: entity.fechaActivacion,
      pacienteId: entity.pacienteId,
      pacienteNombre: entity.pacienteNombre,
      profesionalAsignado: entity.profesionalAsignado,
    };
  }
}
