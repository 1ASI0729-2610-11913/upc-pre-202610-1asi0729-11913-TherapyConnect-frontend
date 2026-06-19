import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Registration } from '../domain/model/registration.entity';
import { RegistrationResource, RegistrationResponse} from './registration-response';

export class RegistrationAssembler implements BaseAssembler<Registration, RegistrationResource, RegistrationResponse> {
  toEntitiesFromResponse(response: RegistrationResponse): Registration[] {
    return response.registrations.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: RegistrationResource): Registration {
    return new Registration({
      id: resource.id,
      registrationState: resource.registrationState,
      registrationDate: resource.registrationDate,
      accessState: resource.accessState,
      accessDate: resource.accessDate,
    });
  }

  toResourceFromEntity(entity: Registration): RegistrationResource {
    return {
      id: entity.id,
      registrationState: entity.registrationState,
      registrationDate: entity.registrationDate,
      accessState: entity.accessState,
      accessDate: entity.accessDate,
    }
  }
}
