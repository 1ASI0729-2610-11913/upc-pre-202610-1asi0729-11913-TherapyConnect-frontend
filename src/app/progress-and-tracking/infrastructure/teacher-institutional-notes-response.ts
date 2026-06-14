import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface TeacherInstitutionalNotesResponse extends BaseResponse {
  institutionalTeacherNotes: TeacherInstitutionalNoteResource[];
}

export interface TeacherInstitutionalNoteResource extends BaseResource {
  studentName: string;
  date: string;
  categories: string[];
  content: string;
  sessionInfo: string;
}
