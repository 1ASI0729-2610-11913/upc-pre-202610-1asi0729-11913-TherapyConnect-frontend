import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface ProductResponse extends BaseResponse {
  products: ProductResource[];
}

export interface ProductResource extends BaseResource {
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
}
