import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Product } from '../domain/model/product.entity';
import {ProductResource, ProductResponse} from './product-response';

export class ProductAssembler implements BaseAssembler<Product, ProductResource, ProductResponse> {
  toEntitiesFromResponse(response: ProductResponse): Product[] {
    return response.products.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: ProductResource): Product {
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

  toResourceFromEntity(entity: Product): ProductResource {
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
