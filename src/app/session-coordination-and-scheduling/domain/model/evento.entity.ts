import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Evento implements BaseEntity {
  private _id: number;
  private _titulo: string;
  private _fechaSesion: string;
  private _horaInicio: string;
  private _horaFin: string;
  private _tipoSesion: string;
  private _estadoEvento: string;
  private _profesorId: number;
  private _estudianteId: number | null;
  private _aulaId: number | null;

  constructor(evento: {
    id: number;
    titulo: string;
    fechaSesion: string;
    horaInicio: string;
    horaFin: string;
    tipoSesion: string;
    estadoEvento: string;
    profesorId: number;
    estudianteId: number | null;
    aulaId: number | null;
  }) {
    this._id = evento.id;
    this._titulo = evento.titulo;
    this._fechaSesion = evento.fechaSesion;
    this._horaInicio = evento.horaInicio;
    this._horaFin = evento.horaFin;
    this._tipoSesion = evento.tipoSesion;
    this._estadoEvento = evento.estadoEvento;
    this._profesorId = evento.profesorId;
    this._estudianteId = evento.estudianteId ?? null;
    this._aulaId = evento.aulaId ?? null;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get titulo(): string { return this._titulo; }
  set titulo(value: string) { this._titulo = value; }

  get fechaSesion(): string { return this._fechaSesion; }
  set fechaSesion(value: string) { this._fechaSesion = value; }

  get horaInicio(): string { return this._horaInicio; }
  set horaInicio(value: string) { this._horaInicio = value; }

  get horaFin(): string { return this._horaFin; }
  set horaFin(value: string) { this._horaFin = value; }

  get tipoSesion(): string { return this._tipoSesion; }
  set tipoSesion(value: string) { this._tipoSesion = value; }

  get estadoEvento(): string { return this._estadoEvento; }
  set estadoEvento(value: string) { this._estadoEvento = value; }

  get profesorId(): number { return this._profesorId; }
  set profesorId(value: number) { this._profesorId = value; }

  get estudianteId(): number | null { return this._estudianteId; }
  set estudianteId(value: number | null) { this._estudianteId = value; }

  get aulaId(): number | null { return this._aulaId; }
  set aulaId(value: number | null) { this._aulaId = value; }
}
