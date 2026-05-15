import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Recordatorio implements BaseEntity {
  private _id: number;
  private _titulo: string;
  private _fechaRecordatorio: string;
  private _horaRecordatorio: string;
  private _estadoRecordatorio: string;
  private _eventoId: number;

  constructor(recordatorio: {
    id: number;
    titulo: string;
    fechaRecordatorio: string;
    horaRecordatorio: string;
    estadoRecordatorio: string;
    eventoId: number;
  }) {
    this._id = recordatorio.id;
    this._titulo = recordatorio.titulo;
    this._fechaRecordatorio = recordatorio.fechaRecordatorio;
    this._horaRecordatorio = recordatorio.horaRecordatorio;
    this._estadoRecordatorio = recordatorio.estadoRecordatorio;
    this._eventoId = recordatorio.eventoId;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get titulo(): string { return this._titulo; }
  set titulo(value: string) { this._titulo = value; }

  get fechaRecordatorio(): string { return this._fechaRecordatorio; }
  set fechaRecordatorio(value: string) { this._fechaRecordatorio = value; }

  get horaRecordatorio(): string { return this._horaRecordatorio; }
  set horaRecordatorio(value: string) { this._horaRecordatorio = value; }

  get estadoRecordatorio(): string { return this._estadoRecordatorio; }
  set estadoRecordatorio(value: string) { this._estadoRecordatorio = value; }

  get eventoId(): number { return this._eventoId; }
  set eventoId(value: number) { this._eventoId = value; }
}
