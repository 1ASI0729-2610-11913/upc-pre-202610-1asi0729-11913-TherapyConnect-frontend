import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import {Product} from '../domain/model/product.entity';

//export type CatalogAvailability = 'active' | 'private' | 'filed';

export interface ProductCatalogResponse extends BaseResponse {
  catalog: ProductCatalogResource[];
}

export interface ProductCatalogResource extends BaseResource {
  id: number;
  productId: number[];
  products: Product[];
  catalogState: String;
  dateUpdate: string;
}
