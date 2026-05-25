import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Dependent } from '../domain/model/dependent.entity';
import { DependentAssembler} from './dependent-assembler';
import { DependentResource, DependentResponse } from './dependent-response';

export class DependentsApiEndpoint extends BaseApiEndpoint<Dependent, DependentResource, DependentResponse, DependentAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderDependentsEndpointPath}`,
      new DependentAssembler(),
    );
  }
}
