import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Evaluation implements BaseEntity {
  private _id: number;
  private _courseId: number | null;
  private _evaluationState: string;
  private _evaluationScore: number;
  private _answer: string;
  private _certificationState: string;

  constructor(evaluation: {
    id: number;
    courseId: number | null;
    evaluationState: string;
    evaluationScore: number;
    answer: string;
    certificationState: string;
  }) {
    this._id = evaluation.id;
    this._courseId = evaluation.courseId ?? null;
    this._evaluationState = evaluation.evaluationState;
    this._evaluationScore = evaluation.evaluationScore;
    this._answer = evaluation.answer;
    this._certificationState = evaluation.certificationState;
  }


  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get courseId(): number | null {
    return this._courseId;
  }
  set courseId(value: number | null) {
    this._courseId = value;
  }

  get evaluationState(): string {
    return this._evaluationState;
  }
  set evaluationState(value: string) {
    this._evaluationState = value;
  }

  get evaluationScore(): number {
    return this._evaluationScore;
  }
  set evaluationScore(value: number) {
    this._evaluationScore = value;
  }

  get answer(): string {
    return this._answer;
  }
  set answer(value: string) {
    this._answer = value;
  }

  get certificationState(): string {
    return this._certificationState;
  }
  set certificationState(value: string) {
    this._certificationState = value;
  }
}
