import { BaseResource } from '../../../shared/infrastructure/base-resource';

export interface SessionChecklistItem extends BaseResource {
  groupTitle: string;
  label: string;
  checked: boolean;
}
