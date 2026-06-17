import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Product } from '../domain/model/product.entity';
import {ProductResource, ProductResponse} from './product-response';

export class ProductAssembler {
  static toEntitiesFromResponse(response: ProductResponse): Product[] {
    return response.products.map((r) => this.toEntityFromResource(r));
  }

  static toEntitiesFromResources(resources: ProductResource[]): Product[] {
    return resources.map((r) => this.toEntityFromResource(r));
  }

  static toEntityFromResource(resource: ProductResource): Product {
    return new Product({
      id: resource.id,
      productName: resource.productName,
      productCategory: resource.productCategory,
      productType: resource.productType,
      availabilityState: resource.availabilityState,
      availableQuantity: resource.availableQuantity,
      recommendationState: resource.recommendationState,
      priority: resource.priority,
      expirationDate: resource.expirationDate,
      groupType: resource.groupType,
    });
  }

  static toResourceFromEntity(entity: Product): ProductResource {
    return {
      id: entity.id,
      productName: entity.productName,
      productCategory: entity.productCategory,
      productType: entity.productType,
      availabilityState: entity.availabilityState,
      availableQuantity: entity.availableQuantity,
      recommendationState: entity.recommendationState,
      priority: entity.priority,
      expirationDate:entity.expirationDate,
      groupType: entity.groupType,
    };
  }
}
