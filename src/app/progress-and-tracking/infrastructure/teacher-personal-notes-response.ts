import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface TeacherPersonalNotesResponse extends BaseResponse {
  personalTeacherNotes: TeacherPersonalNoteResource[];
}

export interface TeacherPersonalNoteResource extends BaseResource {
  noteDate?: string;
  conditionType?: string;
  conditionDescription?: string;
  authorProfileId?: number;
  sessionId?: number;
  teacherNoteType?: string;
  studentName?: string;
  date?: string;
  categories?: string[];
  content?: string;
  sessionInfo?: string;
}
