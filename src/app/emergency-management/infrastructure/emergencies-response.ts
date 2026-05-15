import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface EmergencyResource extends BaseResource {
  descripcion: string;
  estadoEmergencia: string;
  nivelCriticidad: string;
  fechaActivacion: string;
  pacienteId: number;
  pacienteNombre: string;
  profesionalAsignado: string | null;
}

export interface EmergenciesResponse extends BaseResponse {
  emergencies: EmergencyResource[];
}
