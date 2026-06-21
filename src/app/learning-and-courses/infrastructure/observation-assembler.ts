import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Observation } from '../domain/model/observation.entity';
import { ObservationResource, ObservationResponse } from './observation-response';

export class ObservationAssembler implements BaseAssembler<Observation, ObservationResource, ObservationResponse> {
  toEntitiesFromResponse(response: ObservationResponse): Observation[] {
    return response.observations.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: ObservationResource): Observation {
    return new Observation({
      id: resource.id,
      observationType: resource.observationType ?? `Sesion ${resource.sessionId ?? ''}`.trim(),
      observationDescription: resource.observationDescription ?? resource.observationText ?? '',
    });
  }

  toResourceFromEntity(entity: Observation): ObservationResource {
    return {
      id: entity.id,
      sessionId: 1,
      studentId: 1,
      teacherId: 3,
      observationText: entity.observationDescription,
      observationDate: new Date().toISOString().slice(0, 10),
      progressRating: 3,
      observationType: entity.observationType,
      observationDescription: entity.observationDescription,
    }
  }
}
