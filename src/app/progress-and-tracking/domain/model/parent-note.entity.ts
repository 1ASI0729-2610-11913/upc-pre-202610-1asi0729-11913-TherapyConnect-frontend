import { BaseEntity } from '../../../shared/infrastructure/base-entity';

/**
 * Apunte personal escrito por un padre de familia (dominio).
 * Usado en: Personal/Parent.
 * No incluye nombre de profesor porque el padre escribe sus propios apuntes.
 */
export class ParentNote implements BaseEntity {
  private _id: number;
  private _childName: string;
  private _date: string;
  private _categories: string[];
  private _content: string;
  private _nextSteps: string;

  constructor(note: {
    id: number;
    childName: string;
    date: string;
    categories: string[];
    content: string;
    nextSteps: string;
  }) {
    this._id = note.id;
    this._childName = note.childName;
    this._date = note.date;
    this._categories = note.categories;
    this._content = note.content;
    this._nextSteps = note.nextSteps;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get childName(): string { return this._childName; }
  set childName(value: string) { this._childName = value; }

  get date(): string { return this._date; }
  set date(value: string) { this._date = value; }

  get categories(): string[] { return this._categories; }
  set categories(value: string[]) { this._categories = value; }

  get content(): string { return this._content; }
  set content(value: string) { this._content = value; }

  get nextSteps(): string { return this._nextSteps; }
  set nextSteps(value: string) { this._nextSteps = value; }
}
