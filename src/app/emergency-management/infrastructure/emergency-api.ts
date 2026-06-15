import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Emergency } from '../domain/model/emergency.entity';
import { EmergenciesApiEndpoint } from './emergencies-api-endpoint';

@Injectable({ providedIn: 'root' })
export class EmergencyApi extends BaseApi {
  private readonly emergenciesEndpoint: EmergenciesApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.emergenciesEndpoint = new EmergenciesApiEndpoint(http);
  }

  getEmergencies(): Observable<Emergency[]> {
    return this.emergenciesEndpoint.getAll();
  }

  getEmergency(id: number): Observable<Emergency> {
    return this.emergenciesEndpoint.getById(id);
  }

  createEmergency(emergency: Emergency): Observable<Emergency> {
    return this.emergenciesEndpoint.create(emergency);
  }

  updateEmergency(emergency: Emergency): Observable<Emergency> {
    return this.emergenciesEndpoint.update(emergency, emergency.id);
  }

  deleteEmergency(id: number): Observable<void> {
    return this.emergenciesEndpoint.delete(id);
  }
}
