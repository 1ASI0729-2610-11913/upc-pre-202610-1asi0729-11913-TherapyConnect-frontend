import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class SessionChecklistItem implements BaseEntity {
  private _id: number;
  private _groupTitle: string;
  private _label: string;
  private _checked: boolean;

  constructor(item: { id: number; groupTitle: string; label: string; checked: boolean }) {
    this._id = item.id;
    this._groupTitle = item.groupTitle;
    this._label = item.label;
    this._checked = item.checked;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get groupTitle(): string {
    return this._groupTitle;
  }
  set groupTitle(value: string) {
    this._groupTitle = value;
  }

  get label(): string {
    return this._label;
  }
  set label(value: string) {
    this._label = value;
  }

  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    this._checked = value;
  }
}
