import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../domain/model/product.entity';
import { Dependent } from '../domain/model/dependent.entity';
import { ProductCatalog } from '../domain/model/product-catalog.entity';

export type AvailabilityState = '' | 'Available' | 'Out of Stock';
export type RecommendationState = '' | 'In Progress' | 'Implemented' | 'Not Implemented';
export type Priority = '' | 'High' | 'Low';
export type ProgressState = '' | 'To Start' | 'In Progress' | 'On Pause';
export type CatalogState = '' | 'Active' | 'Private' | 'Filled';

export const DEFAULT_AVAILABILITY_STATES: AvailabilityState[] = ['Available', 'Out of Stock'];
export const DEFAULT_RECOMMENDATION_STATES: RecommendationState[] = ['In Progress', 'Implemented', 'Not Implemented'];
export const DEFAULT_PRIORITY: Priority[] = ['High', 'Low'];
export const DEFAULT_PROGRESS_STATE: ProgressState[] = ['To Start', 'In Progress', 'On Pause'];
export const DEFAULT_CATALOG_STATE: CatalogState[] = ['Active', 'Private', 'Filled'];

export interface MarketPlace {
  availabilityState: AvailabilityState;
  recommendationState: RecommendationState;
  priority: Priority;
  progressState: ProgressState;
  catalogState: CatalogState;
}

function emptyMarket(): MarketPlace {
  return {
    availabilityState: '',
    recommendationState: '',
    priority: '',
    progressState: '',
    catalogState: '',
  };
}

@Injectable({ providedIn: 'root' })
export class MarketplaceAndRecommendationsStore {

}
