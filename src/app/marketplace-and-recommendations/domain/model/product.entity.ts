import {BaseEntity} from '../../../shared/infrastructure/base-entity';

export class Product implements BaseEntity {
  private _id: number;
  private _productName: string;
  private _productCategory: string;
  private _productType: string;
  private _availabilityState: string;
  private _availableQuantity: number;
  private _recommendationState: string;
  private _priority: string;
  private _expirationDate: string;
  private _groupType: string;

  constructor(product: {
    id: number;
    productName: string;
    productCategory: string;
    productType: string;
    availabilityState: string;
    availableQuantity: number;
    recommendationState: string;
    priority: string;
    expirationDate: string;
    groupType: string;
  }) {
    this._id = product.id;
    this._productName = product.productName;
    this._productCategory = product.productCategory;
    this._productType = product.productType;
    this._availabilityState = product.availabilityState;
    this._availableQuantity = product.availableQuantity;
    this._recommendationState = product.recommendationState;
    this._priority = product.priority;
    this._expirationDate = product.expirationDate;
    this._groupType = product.groupType;
  }


  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get productName(): string {
    return this._productName;
  }
  set productName(value: string) {
    this._productName = value;
  }

  get productCategory(): string {
    return this._productCategory;
  }
  set productCategory(value: string) {
    this._productCategory = value;
  }

  get productType(): string {
    return this._productType;
  }
  set productType(value: string) {
    this._productType = value;
  }

  get availabilityState(): string {
    return this._availabilityState;
  }
  set availabilityState(value: string) {
    this._availabilityState = value;
  }

  get availableQuantity(): number {
    return this._availableQuantity;
  }
  set availableQuantity(value: number) {
    this._availableQuantity = value;
  }

  get recommendationState(): string {
    return this._recommendationState;
  }
  set recommendationState(value: string) {
    this._recommendationState = value;
  }

  get priority(): string {
    return this._priority;
  }
  set priority(value: string) {
    this._priority = value;
  }

  get expirationDate(): string {
    return this._expirationDate;
  }
  set expirationDate(value: string) {
    this._expirationDate = value;
  }

  get groupType(): string {
    return this._groupType;
  }
  set groupType(value: string) {
    this._groupType = value;
  }
}
