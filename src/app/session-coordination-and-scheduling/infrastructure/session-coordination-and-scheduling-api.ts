import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Evento } from '../domain/model/evento.entity';
import { Recordatorio } from '../domain/model/recordatorio.entity';
import { EventosApiEndpoint } from './eventos-api-endpoint';
import { RecordatoriosApiEndpoint } from './recordatorios-api-endpoint';

@Injectable({ providedIn: 'root' })
export class SessionCoordinationAndSchedulingApi extends BaseApi {
  private readonly eventosEndpoint: EventosApiEndpoint;
  private readonly recordatoriosEndpoint: RecordatoriosApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.eventosEndpoint = new EventosApiEndpoint(http);
    this.recordatoriosEndpoint = new RecordatoriosApiEndpoint(http);
  }

  getEventos(): Observable<Evento[]> {
    return this.eventosEndpoint.getAll();
  }

  getEvento(id: number): Observable<Evento> {
    return this.eventosEndpoint.getById(id);
  }

  createEvento(evento: Evento): Observable<Evento> {
    return this.eventosEndpoint.create(evento);
  }

  updateEvento(evento: Evento): Observable<Evento> {
    return this.eventosEndpoint.update(evento, evento.id);
  }

  deleteEvento(id: number): Observable<void> {
    return this.eventosEndpoint.delete(id);
  }

  getRecordatorios(): Observable<Recordatorio[]> {
    return this.recordatoriosEndpoint.getAll();
  }

  getRecordatorio(id: number): Observable<Recordatorio> {
    return this.recordatoriosEndpoint.getById(id);
  }

  createRecordatorio(recordatorio: Recordatorio): Observable<Recordatorio> {
    return this.recordatoriosEndpoint.create(recordatorio);
  }

  updateRecordatorio(recordatorio: Recordatorio): Observable<Recordatorio> {
    return this.recordatoriosEndpoint.update(recordatorio, recordatorio.id);
  }

  deleteRecordatorio(id: number): Observable<void> {
    return this.recordatoriosEndpoint.delete(id);
  }
}
