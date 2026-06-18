import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Registration } from '../domain/model/registration.entity';
import { RegistrationAssembler } from './registration-assembler';
import { RegistrationResource, RegistrationResponse } from './registration-response';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RegistrationApi {
  private baseUrl = environment.platformProviderApiBaseUrl;
  private endpoint = environment.platformProviderRegistrationsEndpointPath;
  private http = inject(HttpClient);

  getRegistrations(): Observable<Registration[]> {
    return this.http
      .get<RegistrationResponse | RegistrationResource[]>(`${this.baseUrl}${this.endpoint}`)
      .pipe(
        map((response) =>
          Array.isArray(response)
            ? RegistrationAssembler.toEntitiesFromResources(response)
            : RegistrationAssembler.toEntitiesFromResponse(response),
          ),
      );
  }

  createRegistration(entity: Registration): Observable<Registration> {
    const resource = RegistrationAssembler.toResourceFromEntity(entity);
    return this.http
      .post<RegistrationResource>(`${this.baseUrl}${this.endpoint}`, resource)
      .pipe(map((response) => RegistrationAssembler.toEntityFromResource(response)));
  }

  updateRegistration(id: number, entity: Registration): Observable<Registration> {
    const resource = RegistrationAssembler.toResourceFromEntity(entity);
    return this.http
      .put<RegistrationResource>(`${this.baseUrl}${this.endpoint}/${id}`, resource)
      .pipe(map((response) => RegistrationAssembler.toEntityFromResource(response)));
  }

  deleteRegistration(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${this.endpoint}/${id}`)
  }
}
