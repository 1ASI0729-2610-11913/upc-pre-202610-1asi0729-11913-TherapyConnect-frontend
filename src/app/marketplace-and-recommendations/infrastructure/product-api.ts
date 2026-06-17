import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../domain/model/product.entity';
import { ProductAssembler } from './product-assembler';
import { ProductResource, ProductResponse } from './product-response';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProductApi {
  private baseUrl = environment.platformProviderApiBaseUrl;
  private endpoint = environment.platformProviderProductsEndpointPath;
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http
      .get<ProductResponse | ProductResource[]>(`${this.baseUrl}${this.endpoint}`)
      .pipe(
        map((response) =>
          Array.isArray(response)
            ? ProductAssembler.toEntitiesFromResources(response)
            : ProductAssembler.toEntitiesFromResponse(response),
          ),
      );
  }

  createProduct(entity: Product): Observable<Product> {
    const resource = ProductAssembler.toResourceFromEntity(entity);
    return this.http
      .post<ProductResource>(`${this.baseUrl}${this.endpoint}`, resource)
      .pipe(map((response) => ProductAssembler.toEntityFromResource(response)));
  }

  updateProduct(id: number, entity: Product): Observable<Product> {
    const resource = ProductAssembler.toResourceFromEntity(entity);
    return this.http
      .put<ProductResource>(`${this.baseUrl}${this.endpoint}/${id}`, resource)
      .pipe(map((response) => ProductAssembler.toEntityFromResource(response)));
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${this.endpoint}/${id}`)
  }
}
