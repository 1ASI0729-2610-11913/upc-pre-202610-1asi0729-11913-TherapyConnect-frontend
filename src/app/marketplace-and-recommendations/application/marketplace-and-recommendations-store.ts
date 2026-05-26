import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../domain/model/product.entity';
import { Dependent } from '../domain/model/dependent.entity';
import { ProductCatalog } from '../domain/model/product-catalog.entity';
import { MarketplaceRecommendationsApi } from '../infrastructure/marketplace-and-recommendations-api';

@Injectable({ providedIn: 'root' })
export class MarketplaceAndRecommendationsStore {
  private readonly api = inject(MarketplaceRecommendationsApi);

  private readonly productsSignal = signal<Product[]>([]);
  private readonly dependentsSignal = signal<Dependent[]>([]);
  private readonly catalogsSignal = signal<ProductCatalog[]>([]);
  private readonly selectedProductSignal = signal<Product | null>(null);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly products = this.productsSignal.asReadonly();
  readonly dependents = this.dependentsSignal.asReadonly();
  readonly catalogs = this.catalogsSignal.asReadonly();
  readonly selectedProduct = this.selectedProductSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  constructor() {
    this.loadProducts();
    this.loadDependents();
    this.loadCatalogs();
  }

  loadProducts(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.getProducts().subscribe({
      next: (products) => {
        this.productsSignal.set(products);
        if (!this.selectedProductSignal() && products.length > 0) {
          this.selectedProductSignal.set(products[0]);
        }
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set('No se pudo cargar todos los productos');
        this.loadingSignal.set(false);
      },
    });
  }

  loadDependents(): void {
    this.api.getDependents().subscribe({
      next: (dependents) => this.dependentsSignal.set(dependents),
      error: () => this.dependentsSignal.set([]),
    });
  }

  loadCatalogs(): void {
    this.api.getProductCatalogs().subscribe({
      next: (catalogs) => this.catalogsSignal.set(catalogs),
      error: () => this.catalogsSignal.set([]),
    });
  }

  selectProduct(product: Product): void {
    this.selectedProductSignal.set(product);
  }

  toggleProduct(id: number): void {
    this.productsSignal.update((items) =>
      items.map((item) => {
        if (item.id != id) return item;
        return new Product({
          id: item.id,
          productName: item.productName,
          productCategory: item.productCategory,
          productType: item.productType,
          availabilityState: item.availabilityState === 'Available' ? 'Out of Stock' : item.availabilityState,
          availableQuantity: item.availableQuantity,
          recommendationState: item.recommendationState === 'In progress' ? 'Implemented' : 'Not Implemented',
          priority: item.priority === 'High' ? 'Low' : item.priority,
          expirationDate: item.expirationDate,
          groupType: item.groupType,
        });
      }),
    );
  }

  toggleDependent(id: number): void {
    this.dependentsSignal.update((items) =>
      items.map((item) => {
        if (item.id != id) return item;
        return new Dependent({
          id: item.id,
          dependentCondition: item.dependentCondition,
          needLevel: item.needLevel,
          progressSate: item.progressSate === 'To start' ? 'In progress' : 'on pause',
        });
      }),
    );
  }

  toggleCatalog(id: number): void {
    this.catalogsSignal.update((items) =>
      items.map((item) => {
        if (item.id != id) return item;
        return new ProductCatalog({
          id: item.id,
          productId: item.productId,
          products: item.products,
          catalogState: item.catalogState === 'Active' ? 'Private' : 'Filed',
          dateUpdate: item.dateUpdate,
        });
      }),
    );
  }
}
