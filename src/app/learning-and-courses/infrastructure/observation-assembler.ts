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
      observationType: resource.observationType,
      observationDescription: resource.observationDescription,
    });
  }

  toResourceFromEntity(entity: Observation): ObservationResource {
    return {
      id: entity.id,
      observationType: entity.observationType,
      observationDescription: entity.observationDescription,
    }
  }
}
