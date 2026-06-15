import { InterfaceRole } from '../../../iam/domain/model/interface-role.enum';
import { PlanType } from './plan-type.enum';

export interface NavigationItem {
  translationKey: string;
  icon: string;
  route?: string;
  badgeCount?: number;
  tone?: 'default' | 'danger';

  signOut?: boolean;

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
