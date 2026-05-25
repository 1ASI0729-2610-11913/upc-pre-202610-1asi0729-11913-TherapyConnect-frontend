import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export type Availability = 'available' | 'out of stock';
export type Recommendation = 'in progress' | 'implemented' | 'not implemented';
export type Priority = 'High' | 'Low';

export interface ProductResponse extends BaseResponse {
  products: ProductResource[];
}

export interface ProductResource extends BaseResource {
  id: number;
  productName: string;
  productCategory: string;
  productType: string;
  availabilityState: Availability;
  availableQuantity: number;
  recommendationState: Recommendation;
  priority: Priority;
  expirationDate: string;
  groupType: string;
}
