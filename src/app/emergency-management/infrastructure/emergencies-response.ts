import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface EmergencyResource extends BaseResource {
  zone?: string;
  ppmLevel?: number;
  criticality?: string;
  status?: string;
  detectedAt?: string;
  descripcion?: string;
  estadoEmergencia?: string;
  nivelCriticidad?: string;
  fechaActivacion?: string;
  pacienteId?: number;
  pacienteNombre?: string;
  profesionalAsignado?: string | null;
}

export interface EmergenciesResponse extends BaseResponse {
  emergencies: EmergencyResource[];
}
