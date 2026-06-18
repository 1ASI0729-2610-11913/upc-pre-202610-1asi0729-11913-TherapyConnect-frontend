import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class TeacherNote implements BaseEntity {
  private _id: number;
  private _studentName: string;
  private _date: string;
  private _categories: string[];
  private _content: string;
  private _sessionInfo: string;


  constructor(note: {
    id: number;
    studentName: string;
    date: string;
    categories: string[];
    content: string;
    sessionInfo: string;
  }) {
    this._id = note.id;
    this._studentName = note.studentName;
    this._date = note.date;
    this._categories = note.categories;
    this._content = note.content;
    this._sessionInfo = note.sessionInfo;
  }




  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get studentName(): string {
    return this._studentName;
  }
  set studentName(value: string) {
    this._studentName = value;
  }

  get date(): string {
    return this._date;
  }
  set date(value: string) {
    this._date = value;
  }

  get categories(): string[] {
    return this._categories;
  }
  set categories(value: string[]) {
    this._categories = value;
  }

  get content(): string {
    return this._content;
  }
  set content(value: string) {
    this._content = value;
  }

  get sessionInfo(): string {
    return this._sessionInfo;
  }
  set sessionInfo(value: string) {
    this._sessionInfo = value;
  }
}
