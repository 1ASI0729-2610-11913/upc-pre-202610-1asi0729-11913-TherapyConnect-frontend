import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface EventosResponse extends BaseResponse {
  eventos: EventoResource[];
}

export interface EventoResource extends BaseResource {
  titulo: string;
  fechaSesion: string;
  horaInicio: string;
  horaFin: string;
  tipoSesion: string;
  estadoEvento: string;
  profesorId: number;
  estudianteId: number | null;
  aulaId: number | null;
}
