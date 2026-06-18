import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Dependent } from '../domain/model/dependent.entity';
import { DependentAssembler} from './dependent-assembler';
import { DependentResource, DependentResponse } from './dependent-response';
import {inject, Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DependentApi {
  private baseUrl = environment.platformProviderApiBaseUrl;
  private endpoint = environment.platformProviderDependentsEndpointPath;
  private http = inject(HttpClient);

  getDependents(): Observable<Dependent[]> {
    return this.http
      .get<DependentResponse | DependentResource[]>(`${this.baseUrl}${this.endpoint}`)
      .pipe(
        map((response) =>
          Array.isArray(response)
            ? DependentAssembler.toEntitiesFromResources(response)
            : DependentAssembler.toEntitiesFromResponse(response),
          ),
      );
  }

  createDependent(entity: Dependent): Observable<Dependent> {
    const resource = DependentAssembler.toResourceFromEntity(entity);
    return this.http
      .post<DependentResource>(`${this.baseUrl}${this.endpoint}`, resource)
      .pipe(map((response) => DependentAssembler.toEntityFromResource(response)));
  }

  updateDependent(id: number, entity: Dependent): Observable<Dependent> {
    const resource = DependentAssembler.toResourceFromEntity(entity);
    return this.http
      .put<DependentResource>(`${this.baseUrl}${this.endpoint}/${id}`, resource)
      .pipe(map((response) => DependentAssembler.toEntityFromResource(response)));
  }

  deleteDependent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${this.endpoint}/${id}`)
  }
}
