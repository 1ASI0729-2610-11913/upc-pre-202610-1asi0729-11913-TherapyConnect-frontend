import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Course implements BaseEntity {
  private _id: number;
  private _titleCourse: string;
  private _stateCourse: string;
  private _categoryNeed: string;
  private _moduleName: string;
  private _moduleState: string;
  private _contentType: string;
  private _contentState: string;
  private _progressPercentage: number;
  private _progressState: string;
  private _improvementIndicator: string;

  constructor(course: {
    id: number;
    titleCourse: string;
    stateCourse: string;
    categoryNeed: string;
    moduleName: string;
    moduleState: string;
    contentType: string;
    contentState: string;
    progressPercentage: number;
    progressState: string;
    improvementIndicator: string;
  }) {
    this._id = course.id;
    this._titleCourse = course.titleCourse;
    this._stateCourse = course.stateCourse;
    this._categoryNeed = course.categoryNeed;
    this._moduleName = course.moduleName;
    this._moduleState = course.moduleState;
    this._contentType = course.contentType;
    this._contentState = course.contentState;
    this._progressPercentage = course.progressPercentage;
    this._progressState = course.progressState;
    this._improvementIndicator = course.improvementIndicator;
  }


  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get titleCourse(): string {
    return this._titleCourse;
  }
  set titleCourse(value: string) {
    this._titleCourse = value;
  }

  get stateCourse(): string {
    return this._stateCourse;
  }
  set stateCourse(value: string) {
    this._stateCourse = value;
  }

  get categoryNeed(): string {
    return this._categoryNeed;
  }
  set categoryNeed(value: string) {
    this._categoryNeed = value;
  }

  get moduleName(): string {
    return this._moduleName;
  }
  set moduleName(value: string) {
    this._moduleName = value;
  }

  get moduleState(): string {
    return this._moduleState;
  }
  set moduleState(value: string) {
    this._moduleState = value;
  }

  get contentType(): string {
    return this._contentType;
  }
  set contentType(value: string) {
    this._contentType = value;
  }

  get contentState(): string {
    return this._contentState;
  }
  set contentState(value: string) {
    this._contentState = value;
  }

  get progressPercentage(): number {
    return this._progressPercentage;
  }
  set progressPercentage(value: number) {
    this._progressPercentage = value;
  }

  get progressState(): string {
    return this._progressState;
  }
  set progressState(value: string) {
    this._progressState = value;
  }

  get improvementIndicator(): string {
    return this._improvementIndicator;
  }
  set improvementIndicator(value: string) {
    this._improvementIndicator = value;
  }
}
