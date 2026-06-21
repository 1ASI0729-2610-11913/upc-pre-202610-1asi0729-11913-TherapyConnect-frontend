import { BaseResource, BaseResponse } from '../../../shared/infrastructure/base-response';

export interface SessionChecklistResponse extends BaseResponse {
  sessionChecklist: SessionChecklistItemResource[];
}

export interface SessionChecklistItemResource extends BaseResource {
  sessionId?: number;
  studentId?: number;
  attendanceStatus?: string;
  attendanceDate?: string;
  remarks?: string;
  groupTitle?: string;
  label?: string;
  checked?: boolean;
}
