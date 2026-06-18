/**
 * Contenedor genérico de metadatos de respuesta API (extensible por bounded context).
 */
export interface BaseResponse {}

/**
 * Estructura estándar de un recurso/DTO expuesto por la API, con identificador numérico.
 */
export interface BaseResource {
  /** Identificador único numérico del recurso. */
  id: number;
}
