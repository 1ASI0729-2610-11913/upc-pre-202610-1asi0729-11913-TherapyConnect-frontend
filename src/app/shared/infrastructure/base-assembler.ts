import { BaseEntity } from './base-entity';
import { BaseResource, BaseResponse } from './base-response';

/**
 * Contrato para ensambladores que convierten entre entidades, recursos y respuestas API.
 *
 * @template TEntity - Tipo de entidad de dominio (debe extender {@link BaseEntity}).
 * @template TResource - Tipo de recurso/DTO (debe extender {@link BaseResource}).
 * @template TResponse - Tipo de respuesta envuelta (debe extender {@link BaseResponse}).
 */
export interface BaseAssembler<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
> {
  toEntityFromResource(resource: TResource): TEntity;

  toResourceFromEntity(entity: TEntity): TResource;

  toEntitiesFromResponse(response: TResponse): TEntity[];
}
