import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface RecordatoriosResponse extends BaseResponse {
  recordatorios: RecordatorioResource[];
}

export interface RecordatorioResource extends BaseResource {
  titulo: string;
  fechaRecordatorio: string;
  horaRecordatorio: string;
  estadoRecordatorio: string;
  eventoId: number;
}
