import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export type EstadoEmergencia = 'ACTIVA' | 'VALIDADA' | 'DESCARTADA' | 'CANCELADA' | 'FINALIZADA';
export type NivelCriticidad = 'LEVE' | 'MODERADA' | 'CRITICA';

export class Emergency implements BaseEntity {
  private _id: number;
  private _descripcion: string;
  private _estadoEmergencia: EstadoEmergencia;
  private _nivelCriticidad: NivelCriticidad;
  private _fechaActivacion: string;
  private _pacienteId: number;
  private _pacienteNombre: string;
  private _profesionalAsignado: string | null;

  constructor(emergency: {
    id: number;
    descripcion: string;
    estadoEmergencia: EstadoEmergencia;
    nivelCriticidad: NivelCriticidad;
    fechaActivacion: string;
    pacienteId: number;
    pacienteNombre: string;
    profesionalAsignado?: string | null;
  }) {
    this._id = emergency.id;
    this._descripcion = emergency.descripcion;
    this._estadoEmergencia = emergency.estadoEmergencia;
    this._nivelCriticidad = emergency.nivelCriticidad;
    this._fechaActivacion = emergency.fechaActivacion;
    this._pacienteId = emergency.pacienteId;
    this._pacienteNombre = emergency.pacienteNombre;
    this._profesionalAsignado = emergency.profesionalAsignado ?? null;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get descripcion(): string {
    return this._descripcion;
  }
  set descripcion(value: string) {
    this._descripcion = value;
  }

  get estadoEmergencia(): EstadoEmergencia {
    return this._estadoEmergencia;
  }
  set estadoEmergencia(value: EstadoEmergencia) {
    this._estadoEmergencia = value;
  }

  get nivelCriticidad(): NivelCriticidad {
    return this._nivelCriticidad;
  }
  set nivelCriticidad(value: NivelCriticidad) {
    this._nivelCriticidad = value;
  }

  get fechaActivacion(): string {
    return this._fechaActivacion;
  }
  set fechaActivacion(value: string) {
    this._fechaActivacion = value;
  }

  get pacienteId(): number {
    return this._pacienteId;
  }
  set pacienteId(value: number) {
    this._pacienteId = value;
  }

  get pacienteNombre(): string {
    return this._pacienteNombre;
  }
  set pacienteNombre(value: string) {
    this._pacienteNombre = value;
  }

  get profesionalAsignado(): string | null {
    return this._profesionalAsignado;
  }
  set profesionalAsignado(value: string | null) {
    this._profesionalAsignado = value;
  }
}
