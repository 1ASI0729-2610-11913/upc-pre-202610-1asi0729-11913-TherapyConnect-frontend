import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Observation implements BaseEntity {
  private _id: number;
  private _observationType: string;
  private _observationDescription: string;

  constructor(observation: {
    id: number;
    observationType: string;
    observationDescription: string;
  }) {
    this._id = observation.id;
    this._observationType = observation.observationType;
    this._observationDescription = observation.observationDescription;
  }


  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get observationType(): string {
    return this._observationType;
  }
  set observationType(value: string) {
    this._observationType = value;
  }

  get observationDescription(): string {
    return this._observationDescription;
  }
  set observationDescription(value: string) {
    this._observationDescription = value;
  }
}
