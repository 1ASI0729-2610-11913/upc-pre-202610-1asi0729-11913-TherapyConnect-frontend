import { BaseEntity } from '../../../shared/infrastructure/base-entity';
import { Product } from './product.entity';
import { CatalogAvailability } from '../../infrastructure/product-catalog-response';

export class ProductCatalog implements BaseEntity {
  private _id: number;
  private _productId: number[];
  private _products: Product[];
  private _catalogState: CatalogAvailability;
  private _dateUpdate: string;

  constructor(catalog: {
    id: number;
    productId: number[];
    products: Product[];
    catalogState: CatalogAvailability;
    dateUpdate: string;
  }) {
    this._id = catalog.id;
    this._productId = catalog.productId;
    this._products = catalog.products;
    this._catalogState = catalog.catalogState;
    this._dateUpdate = catalog.dateUpdate;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get productId(): number[] {
    return this._productId;
  }
  set productId(value: number[]) {
    this._productId = value;
  }

  get products(): Product[] {
    return this._products;
  }
  set products(value: Product[]) {
    this._products = value;
  }

  get catalogState(): CatalogAvailability {
    return this._catalogState;
  }
  set catalogState(value: CatalogAvailability) {
    this._catalogState = value;
  }

  get dateUpdate(): string {
    return this._dateUpdate;
  }
  set dateUpdate(value: string) {
    this._dateUpdate = value;
  }
}
