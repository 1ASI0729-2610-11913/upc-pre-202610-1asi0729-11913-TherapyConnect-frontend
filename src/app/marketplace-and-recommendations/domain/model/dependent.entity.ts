import {BaseEntity} from '../../../shared/infrastructure/base-entity';
//import {State} from '../../infrastructure/dependent-response';

export class Dependent implements BaseEntity {
  private _id: number;
  private _dependentCondition: string;
  private _needLevel: string;
  private _progressSate: string;

  constructor(dependent: {
    id: number;
    dependentCondition: string;
    needLevel: string;
    progressSate: string;
  }) {
    this._id = dependent.id;
    this._dependentCondition = dependent.dependentCondition;
    this._needLevel = dependent.needLevel;
    this._progressSate = dependent.progressSate;
  }


  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get dependentCondition(): string {
    return this._dependentCondition;
  }
  set dependentCondition(value: string) {
    this._dependentCondition = value;
  }

  get needLevel(): string {
    return this._needLevel;
  }
  set needLevel(value: string) {
    this._needLevel = value;
  }

  get progressSate(): string {
    return this._progressSate;
  }
  set progressSate(value: string) {
    this._progressSate = value;
  }
}
