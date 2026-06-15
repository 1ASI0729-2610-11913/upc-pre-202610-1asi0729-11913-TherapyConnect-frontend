import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export type SessionType = 'private' | 'group';
export type SessionModality = 'presential' | 'virtual';
export type SessionStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
export type SessionAccessType = 'premium' | 'institutional';

export class TherapySession implements BaseEntity {
  private _id: number;
  private _patientName: string;
  private _patientAge: number;
  private _conditionLabel: string;
  private _parentName: string;
  private _professionalName: string;
  private _classroomName: string;
  private _dateLabel: string;
  private _weekdayLabel: string;
  private _startTime: string;
  private _endTime: string;
  private _durationMinutes: number;
  private _type: SessionType;
  private _modality: SessionModality;
  private _status: SessionStatus;
  private _accessType: SessionAccessType;
  private _observationsCount: number;

  constructor(session: {
    id: number;
    patientName: string;
    patientAge: number;
    conditionLabel: string;
    parentName: string;
    professionalName: string;
    classroomName: string;
    dateLabel: string;
    weekdayLabel: string;
    startTime: string;
    endTime: string;
    durationMinutes: number;
    type: SessionType;
    modality: SessionModality;
    status: SessionStatus;
    accessType: SessionAccessType;
    observationsCount: number;
  }) {
    this._id = session.id;
    this._patientName = session.patientName;
    this._patientAge = session.patientAge;
    this._conditionLabel = session.conditionLabel;
    this._parentName = session.parentName;
    this._professionalName = session.professionalName;
    this._classroomName = session.classroomName;
    this._dateLabel = session.dateLabel;
    this._weekdayLabel = session.weekdayLabel;
    this._startTime = session.startTime;
    this._endTime = session.endTime;
    this._durationMinutes = session.durationMinutes;
    this._type = session.type;
    this._modality = session.modality;
    this._status = session.status;
    this._accessType = session.accessType;
    this._observationsCount = session.observationsCount;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get patientName(): string {
    return this._patientName;
  }
  set patientName(value: string) {
    this._patientName = value;
  }

  get patientAge(): number {
    return this._patientAge;
  }
  set patientAge(value: number) {
    this._patientAge = value;
  }

  get conditionLabel(): string {
    return this._conditionLabel;
  }
  set conditionLabel(value: string) {
    this._conditionLabel = value;
  }

  get parentName(): string {
    return this._parentName;
  }
  set parentName(value: string) {
    this._parentName = value;
  }

  get professionalName(): string {
    return this._professionalName;
  }
  set professionalName(value: string) {
    this._professionalName = value;
  }

  get classroomName(): string {
    return this._classroomName;
  }
  set classroomName(value: string) {
    this._classroomName = value;
  }

  get dateLabel(): string {
    return this._dateLabel;
  }
  set dateLabel(value: string) {
    this._dateLabel = value;
  }

  get weekdayLabel(): string {
    return this._weekdayLabel;
  }
  set weekdayLabel(value: string) {
    this._weekdayLabel = value;
  }

  get startTime(): string {
    return this._startTime;
  }
  set startTime(value: string) {
    this._startTime = value;
  }

  get endTime(): string {
    return this._endTime;
  }
  set endTime(value: string) {
    this._endTime = value;
  }

  get durationMinutes(): number {
    return this._durationMinutes;
  }
  set durationMinutes(value: number) {
    this._durationMinutes = value;
  }

  get type(): SessionType {
    return this._type;
  }
  set type(value: SessionType) {
    this._type = value;
  }

  get modality(): SessionModality {
    return this._modality;
  }
  set modality(value: SessionModality) {
    this._modality = value;
  }

  get status(): SessionStatus {
    return this._status;
  }
  set status(value: SessionStatus) {
    this._status = value;
  }

  get accessType(): SessionAccessType {
    return this._accessType;
  }
  set accessType(value: SessionAccessType) {
    this._accessType = value;
  }

  get observationsCount(): number {
    return this._observationsCount;
  }
  set observationsCount(value: number) {
    this._observationsCount = value;
  }
}
