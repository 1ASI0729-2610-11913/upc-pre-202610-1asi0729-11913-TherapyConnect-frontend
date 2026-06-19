import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Dependent } from '../domain/model/dependent.entity';
import {DependentResource, DependentResponse} from './dependent-response';

export class DependentAssembler implements BaseAssembler<Dependent, DependentResource, DependentResponse> {
  toEntitiesFromResponse(response: DependentResponse): Dependent[] {
    return response.dependents.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: DependentResource): Dependent {
    return new Dependent({
      id: resource.id,
      dependentCondition: resource.dependentCondition,
      needLevel: resource.needLevel,
      progressSate: resource.progressSate,
    });
  }

  toResourceFromEntity(entity: Dependent): DependentResource {
    return {
      id: entity.id,
      dependentCondition: entity.dependentCondition,
      needLevel: entity.needLevel,
      progressSate: entity.progressSate,
    };
  }
}
