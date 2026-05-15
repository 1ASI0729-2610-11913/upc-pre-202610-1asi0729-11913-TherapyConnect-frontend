import { BaseResource, BaseResponse } from '../../../shared/infrastructure/base-response';

export interface SessionChecklistResponse extends BaseResponse {
  sessionChecklist: SessionChecklistItemResource[];
}

export interface SessionChecklistItemResource extends BaseResource {
  groupTitle: string;
  label: string;
  checked: boolean;
}
