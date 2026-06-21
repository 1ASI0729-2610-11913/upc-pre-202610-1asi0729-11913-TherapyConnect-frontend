import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Emergency } from '../domain/model/emergency.entity';
import { EmergencyAssembler } from './emergency-assembler';
import { EmergenciesResponse, EmergencyResource } from './emergencies-response';

export class EmergenciesApiEndpoint extends BaseApiEndpoint<
  Emergency,
  EmergencyResource,
  EmergenciesResponse,
  EmergencyAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderEmergenciesEndpointPath}`,
      new EmergencyAssembler(),
    );
  }

  override getAll(): Observable<Emergency[]> {
    return this.http
      .get<EmergencyResource[]>(`${this.endpointUrl}?status=PENDING`)
      .pipe(
        map((response) => response.map((resource) => this.assembler.toEntityFromResource(resource))),
        catchError(this.handleError('Failed to fetch alerts')),
      );
  }
}
