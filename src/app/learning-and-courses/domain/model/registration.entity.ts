import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Registration implements BaseEntity {
  private _id: number;
  private _registrationState: string;
  private _registrationDate: string;
  private _accessState: string;
  private _accessDate: string;

  constructor(registration: {
    id: number;
    registrationState: string;
    registrationDate: string;
    accessState: string;
    accessDate: string;
  }) {
    this._id = registration.id;
    this._registrationState = registration.registrationState;
    this._registrationDate = registration.registrationDate;
    this._accessState = registration.accessState;
    this._accessDate = registration.accessDate;
  }


  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get registrationState(): string {
    return this._registrationState;
  }
  set registrationState(value: string) {
    this._registrationState = value;
  }

  get registrationDate(): string {
    return this._registrationDate;
  }
  set registrationDate(value: string) {
    this._registrationDate = value;
  }

  get accessState(): string {
    return this._accessState;
  }
  set accessState(value: string) {
    this._accessState = value;
  }

  get accessDate(): string {
    return this._accessDate;
  }
  set accessDate(value: string) {
    this._accessDate = value;
  }
}
