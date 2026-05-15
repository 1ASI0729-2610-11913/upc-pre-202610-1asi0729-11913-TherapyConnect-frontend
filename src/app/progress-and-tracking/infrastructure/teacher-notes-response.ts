import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface TeacherNotesResponse extends BaseResponse {
  teacherNotes: TeacherNoteResource[];
}

export interface TeacherNoteResource extends BaseResource {
  studentName: string;
  date: string;
  categories: string[];
  content: string;
  sessionInfo: string;
}
