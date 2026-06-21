import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface RecordatoriosResponse extends BaseResponse {
  recordatorios: RecordatorioResource[];
}

export interface RecordatorioResource extends BaseResource {
  title?: string;
  reminderDate?: string;
  reminderTime?: string;
  reminderStatus?: string;
  sessionId?: number;
  titulo?: string;
  fechaRecordatorio?: string;
  horaRecordatorio?: string;
  estadoRecordatorio?: string;
  eventoId?: number;
}
