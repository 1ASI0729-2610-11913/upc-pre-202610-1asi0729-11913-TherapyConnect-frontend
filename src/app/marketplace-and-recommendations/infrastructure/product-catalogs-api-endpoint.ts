import { HttpClient } from '@angular/common/http';
import { environment} from '../../../environments/environment';
import { BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import { ProductCatalog } from '../domain/model/product-catalog.entity';
import { ProductCatalogAssembler } from './product-catalog-assembler';
import { ProductCatalogResource, ProductCatalogResponse } from './product-catalog-response';

export class ProductCatalogsApiEndpoint extends BaseApiEndpoint<ProductCatalog, ProductCatalogResource, ProductCatalogResponse, ProductCatalogAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderCatalogsEndpointPath}`,
      new ProductCatalogAssembler(),
    );
  }
}
