import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Evento } from '../domain/model/evento.entity';
import { EventoAssembler } from './evento-assembler';
import { EventoResource, EventosResponse } from './eventos-response';

export class EventosApiEndpoint extends BaseApiEndpoint<Evento, EventoResource, EventosResponse, EventoAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderEventosEndpointPath}`,
      new EventoAssembler(),
    );
  }
}
