import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { ProductCatalog } from '../domain/model/product-catalog.entity'
import {ProductCatalogResource, ProductCatalogResponse} from './product-catalog-response';

export class ProductCatalogAssembler {
  static toEntitiesFromResponse(response: ProductCatalogResponse): ProductCatalog[] {
    return response.catalog.map((r) => this.toEntityFromResource(r));
  }

  static toEntityFromResource(resource: ProductCatalogResource): ProductCatalog {
    return new ProductCatalog({
      id: resource.id,
      productId: resource.productId,
      products: resource.products,
      catalogState: resource.catalogState,
      dateUpdate: resource.dateUpdate,
    });
  }

  static toResourceFromEntity(entity: ProductCatalog): ProductCatalogResource {
    return {
      id: entity.id,
      productId: entity.productId,
      products: entity.products,
      catalogState: entity.catalogState,
      dateUpdate: entity.dateUpdate,
    };
  }
}
