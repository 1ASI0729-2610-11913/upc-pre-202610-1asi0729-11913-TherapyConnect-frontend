import { HttpClient } from '@angular/common/http';
import { environment} from '../../../environments/environment';
import { ProductCatalog } from '../domain/model/product-catalog.entity';
import { ProductCatalogAssembler } from './product-catalog-assembler';
import { ProductCatalogResource, ProductCatalogResponse } from './product-catalog-response';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProductCatalogApi {
  private baseUrl = environment.platformProviderApiBaseUrl;
  private endpoint = environment.platformProviderCatalogsEndpointPath;
  private http = inject(HttpClient);

  getProductCatalogs(): Observable<ProductCatalog[]> {
    return this.http
      .get<ProductCatalogResponse | ProductCatalogResource[]>(`${this.baseUrl}${this.endpoint}`)
      .pipe(
        map((response) =>
          Array.isArray(response)
            ? ProductCatalogAssembler.toEntitiesFromResources(response)
            : ProductCatalogAssembler.toEntitiesFromResponse(response),
          ),
      );
  }

  createProductCatalog(entity: ProductCatalog): Observable<ProductCatalog> {
    const resource = ProductCatalogAssembler.toResourceFromEntity(entity);
    return this.http
      .post<ProductCatalogResource>(`${this.baseUrl}${this.endpoint}`, resource)
      .pipe(map((response) => ProductCatalogAssembler.toEntityFromResource(response)));
  }

  updateProductCatalog(id: number, entity: ProductCatalog): Observable<ProductCatalog> {
    const resource = ProductCatalogAssembler.toResourceFromEntity(entity);
    return this.http
      .put<ProductCatalogResource>(`${this.baseUrl}${this.endpoint}/${id}`, resource)
      .pipe(map((response) => ProductCatalogAssembler.toEntityFromResource(response)));
  }

  deleteProductCatalog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${this.endpoint}/${id}`)
  }
}
