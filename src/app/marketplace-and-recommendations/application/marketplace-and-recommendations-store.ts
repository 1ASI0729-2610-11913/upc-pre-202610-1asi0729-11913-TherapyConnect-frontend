import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../domain/model/product.entity';
import { Dependent } from '../domain/model/dependent.entity';
import { ProductCatalog } from '../domain/model/product-catalog.entity';
import {ProductApi} from '../infrastructure/product-api';
import {DependentApi} from '../infrastructure/dependent-api';
import {ProductCatalogApi} from '../infrastructure/product-catalog-api';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs';

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
  private readonly productApi = inject(ProductApi);
  private readonly dependentApi = inject(DependentApi);
  private readonly catalogApi = inject(ProductCatalogApi);

  private readonly _products = signal<Product[]>([]);
  private readonly _dependents = signal<Dependent[]>([]);
  private readonly _catalogs = signal<ProductCatalog[]>([]);
  private readonly _loading = signal(false);

  readonly products = this._products.asReadonly();
  readonly dependents = this._dependents.asReadonly();
  readonly catalogs = this._catalogs.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly availableProducts = computed(() =>
    this._products().filter(
      (product) => product.availabilityState === 'Available',
    ),
  );

  readonly recommendedProducts = computed(() =>
    this._products().filter(
      (product) => product.recommendationState === 'Implemented',
    ),
  );

  readonly activeCatalogs = computed(() =>
    this._catalogs().filter(
      (catalog) => catalog.catalogState === 'Active',
    ),
  );

  loadAll(): void {
    this.loadProducts();
    this.loadDependents();
    this.loadCatalogs();
  }

  loadProducts(): void {
    this._loading.set(true);

    this.productApi
      .getProducts()
      .pipe(
        catchError(() => of([])),
        finalize(() => this._loading.set(false)),
      )
      .subscribe((products) => {
        this._products.set(products);
      });
  }

  loadDependents(): void {
    this._loading.set(true);

    this.dependentApi
      .getDependents()
      .pipe(
        catchError(() => of([])),
        finalize(() => this._loading.set(false)),
      )
      .subscribe((dependents) => {
        this._dependents.set(dependents);
      });
  }

  loadCatalogs(): void {
    this._loading.set(true);

    this.catalogApi
      .getProductCatalogs()
      .pipe(
        catchError(() => of([])),
        finalize(() => this._loading.set(false)),
      )
      .subscribe((catalogs) => {
        this._catalogs.set(catalogs);
      });
  }

  deleteProduct(id: number): void {
    this._loading.set(true);

    this.productApi
      .deleteProduct(id)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe(() => {
        this._products.update((products) =>
        products.filter((p) => p.id !== id),
        );
      });
  }

  deleteDependent(id: number): void {
    this._loading.set(true);

    this.dependentApi
      .deleteDependent(id)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe(() => {
        this._dependents.update((dependents) =>
        dependents.filter((p) => p.id !== id),
        );
      });
  }

  deleteCatalog(id: number): void {
    this._loading.set(true);

    this.catalogApi
      .deleteProductCatalog(id)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe(() => {
        this._catalogs.update((catalogs) =>
        catalogs.filter((p) => p.id !== id),
        );
      });
  }

  findProductById(id: number): Product | undefined {
    return this._products().find((product) => product.id === id);
  }

  findDependentById(id: number): Dependent | undefined {
    return this._dependents().find((dependent) => dependent.id === id);
  }

  findCatalogById(id: number): ProductCatalog | undefined {
    return this._catalogs().find((catalog) => catalog.id === id);
  }
}
