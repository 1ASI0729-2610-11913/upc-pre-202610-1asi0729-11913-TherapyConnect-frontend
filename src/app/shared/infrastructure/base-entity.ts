/**
 * Identidad mínima compartida por entidades de dominio en cualquier bounded context.
 */
export interface BaseEntity {
  /** Identificador único numérico del recurso. */
  id: number;
}
