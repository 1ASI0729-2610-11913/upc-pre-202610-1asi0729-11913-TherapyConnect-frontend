import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Product } from '../domain/model/product.entity';
import { Dependent } from '../domain/model/dependent.entity';
import { ProductCatalog } from '../domain/model/product-catalog.entity';
import { ProductsApiEndpoint} from './products-api-endpoint';
import { DependentsApiEndpoint } from './dependents-api-endpoint';
import { ProductCatalogsApiEndpoint } from './product-catalogs-api-endpoint';

@Injectable({ providedIn: 'root' })
export class MarketplaceRecommendationsApi extends BaseApi {
  private readonly productsEndpoint: ProductsApiEndpoint;
  private readonly dependentsEndpoint: DependentsApiEndpoint;
  private readonly productcatalogsEndpoint: ProductCatalogsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.productsEndpoint = new ProductsApiEndpoint(http);
    this.dependentsEndpoint = new DependentsApiEndpoint(http);
    this.productcatalogsEndpoint = new ProductCatalogsApiEndpoint(http);
  }


  getProducts(): Observable<Product[]> {
    return this.productsEndpoint.getAll();
  }
  getProduct(id: number): Observable<Product> {
    return this.productsEndpoint.getById(id);
  }
  createProduct(product: Product): Observable<Product> {
    return this.productsEndpoint.create(product);
  }
  updateProduct(product: Product): Observable<Product> {
    return this.productsEndpoint.update(product, product.id);
  }
  deleteProduct(id: number): Observable<void> {
    return this.productsEndpoint.delete(id);
  }

  getDependents(): Observable<Dependent[]> {
    return this.dependentsEndpoint.getAll();
  }
  getDependent(id: number): Observable<Dependent> {
    return this.dependentsEndpoint.getById(id);
  }
  createDependent(dependent: Dependent): Observable<Dependent> {
    return this.dependentsEndpoint.create(dependent);
  }
  updateDependent(dependent: Dependent): Observable<Dependent> {
    return this.dependentsEndpoint.update(dependent, dependent.id);
  }
  deleteDependent(id: number): Observable<void> {
    return this.dependentsEndpoint.delete(id);
  }

  getProductCatalogs(): Observable<ProductCatalog[]> {
    return this.productcatalogsEndpoint.getAll();
  }
  getProductCatalog(id: number): Observable<ProductCatalog> {
    return this.productcatalogsEndpoint.getById(id);
  }
  createProductCatalog(productCatalog: ProductCatalog): Observable<ProductCatalog> {
    return this.productcatalogsEndpoint.create(productCatalog);
  }
  updateProductCatalog(productCatalog: ProductCatalog): Observable<ProductCatalog> {
    return this.productcatalogsEndpoint.update(productCatalog, productCatalog.id);
  }
  deleteProductCatalog(id: number): Observable<void> {
    return this.productcatalogsEndpoint.delete(id);
  }
}
