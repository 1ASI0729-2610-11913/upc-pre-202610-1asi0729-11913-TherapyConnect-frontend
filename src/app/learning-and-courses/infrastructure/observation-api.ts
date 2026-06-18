import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observation } from '../domain/model/observation.entity';
import { ObservationAssembler } from './observation-assembler';
import { ObservationResource, ObservationResponse } from './observation-response';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ObservationApi {
  private baseUrl = environment.platformProviderApiBaseUrl;
  private endpoint = environment.platformProviderObservationsEndpointPath;
  private http = inject(HttpClient);

  getObservations(): Observable<Observation[]> {
    return this.http
      .get<ObservationResponse | ObservationResource[]>(`${this.baseUrl}${this.endpoint}`)
      .pipe(
        map((response) =>
          Array.isArray(response)
            ? ObservationAssembler.toEntitiesFromResources(response)
            : ObservationAssembler.toEntitiesFromResponse(response),
          ),
      );
  }

  createObservation(entity: Observation): Observable<Observation> {
    const resource = ObservationAssembler.toResourceFromEntity(entity);
    return this.http
      .post<ObservationResource>(`${this.baseUrl}${this.endpoint}`, resource)
      .pipe(map((response) => ObservationAssembler.toEntityFromResource(response)));
  }

  updateObservation(id: number, entity: Observation): Observable<Observation> {
    const resource = ObservationAssembler.toResourceFromEntity(entity);
    return this.http
      .put<ObservationResource>(`${this.baseUrl}${this.endpoint}/${id}`, resource)
      .pipe(map((response) => ObservationAssembler.toEntityFromResource(response)));
  }

  deleteObservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${this.endpoint}/${id}`)
  }
}
