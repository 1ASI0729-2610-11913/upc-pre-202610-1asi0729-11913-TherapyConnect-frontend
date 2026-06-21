import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Observation } from '../domain/model/observation.entity';
import { ObservationAssembler } from './observation-assembler';
import { ObservationResource, ObservationResponse } from './observation-response';

export class ObservationsApiEndpoint extends BaseApiEndpoint<Observation, ObservationResource, ObservationResponse, ObservationAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderObservationsEndpointPath}`,
      new ObservationAssembler(),
    );
  }

  override getAll(): Observable<Observation[]> {
    return this.http
      .get<ObservationResource[]>(`${this.endpointUrl}/student/1`)
      .pipe(
        map((response) => response.map((resource) => this.assembler.toEntityFromResource(resource))),
        catchError(this.handleError('Failed to fetch session observations')),
      );
  }
}
