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
    const status = resource.estadoEmergencia ?? (resource.status === 'RESOLVED' ? 'FINALIZADA' : 'ACTIVA');
    const criticality = resource.nivelCriticidad ?? this.mapAlertCriticality(resource.criticality);
    return new Emergency({
      id: Number(resource.id),
      descripcion: resource.descripcion ?? `${resource.zone ?? 'Zona sin identificar'} - ${resource.ppmLevel ?? 0} ppm`,
      estadoEmergencia: status as EstadoEmergencia,
      nivelCriticidad: criticality as NivelCriticidad,
      fechaActivacion: resource.fechaActivacion ?? resource.detectedAt ?? '',
      pacienteId: Number(resource.pacienteId ?? 0),
      pacienteNombre: resource.pacienteNombre ?? resource.zone ?? '',
      profesionalAsignado: resource.profesionalAsignado ?? null,
    });
  }

  toResourceFromEntity(entity: Emergency): EmergencyResource {
    return {
      id: Number(entity.id),
      zone: entity.pacienteNombre,
      ppmLevel: 0,
      criticality: entity.nivelCriticidad,
      status: entity.estadoEmergencia,
      detectedAt: entity.fechaActivacion,
      descripcion: entity.descripcion,
      estadoEmergencia: entity.estadoEmergencia,
      nivelCriticidad: entity.nivelCriticidad,
      fechaActivacion: entity.fechaActivacion,
      pacienteId: entity.pacienteId,
      pacienteNombre: entity.pacienteNombre,
      profesionalAsignado: entity.profesionalAsignado,
    };
  }

  private mapAlertCriticality(criticality?: string): NivelCriticidad {
    switch (criticality) {
      case 'HIGH':
        return 'CRITICA';
      case 'MEDIUM':
        return 'MODERADA';
      default:
        return 'LEVE';
    }
  }
}
