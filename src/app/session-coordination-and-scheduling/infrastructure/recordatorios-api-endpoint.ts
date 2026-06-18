import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Recordatorio } from '../domain/model/recordatorio.entity';
import { RecordatorioAssembler } from './recordatorio-assembler';
import { RecordatorioResource, RecordatoriosResponse } from './recordatorios-response';

export class RecordatoriosApiEndpoint extends BaseApiEndpoint<
  Recordatorio,
  RecordatorioResource,
  RecordatoriosResponse,
  RecordatorioAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderRecordatoriosEndpointPath}`,
      new RecordatorioAssembler(),
    );
  }
}
