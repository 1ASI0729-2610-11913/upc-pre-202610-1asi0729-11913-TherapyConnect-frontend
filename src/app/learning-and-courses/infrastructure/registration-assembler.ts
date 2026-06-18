import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Registration } from '../domain/model/registration.entity';
import { RegistrationResource, RegistrationResponse} from './registration-response';

export class RegistrationAssembler {
  static toEntitiesFromResponse(response: RegistrationResponse): Registration[] {
    return response.registrations.map((resource) => this.toEntityFromResource(resource));
  }

  static toEntitiesFromResources(resources: RegistrationResource[]): Registration[] {
    return resources.map((r) => this.toEntityFromResource(r));
  }

  static toEntityFromResource(resource: RegistrationResource): Registration {
    return new Registration({
      id: resource.id,
      registrationState: resource.registrationState,
      registrationDate: resource.registrationDate,
      accessState: resource.accessState,
      accessDate: resource.accessDate,
    });
  }

  static toResourceFromEntity(entity: Registration): RegistrationResource {
    return {
      id: entity.id,
      registrationState: entity.registrationState,
      registrationDate: entity.registrationDate,
      accessState: entity.accessState,
      accessDate: entity.accessDate,
    }
  }
}
