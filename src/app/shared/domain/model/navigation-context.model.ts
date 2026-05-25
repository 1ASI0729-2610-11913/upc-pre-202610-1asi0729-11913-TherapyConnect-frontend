import { InterfaceRole } from '../../../iam/domain/model/interface-role.enum';
import { PlanType } from './plan-type.enum';

export interface NavigationItem {
  translationKey: string;
  icon: string;
  route?: string;
  badgeCount?: number;
  tone?: 'default' | 'danger';
  /** Cierra sesión: limpia contexto y vuelve a elegir plan y rol. */
  signOut?: boolean;
  /**
   * Cómo marca RouterLinkActive la ruta como activa.
   * `subset`: activa también en rutas hijas (p. ej. `/app/sessions` con `/app/sessions/live`).
   */
  pathMatch?: 'exact' | 'subset';
}

export interface NavigationGroup {
  translationKey: string;
  items: NavigationItem[];
}

export interface NavigationContext {
  plan: PlanType;
  role: InterfaceRole;
}
