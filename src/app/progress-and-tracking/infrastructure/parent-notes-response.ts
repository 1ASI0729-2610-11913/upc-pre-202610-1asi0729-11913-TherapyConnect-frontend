import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface ParentNotesResponse extends BaseResponse {
  parentNotes: ParentNoteResource[];
}

export interface ParentNoteResource extends BaseResource {
  noteDate?: string;
  conditionType?: string;
  conditionDescription?: string;
  authorProfileId?: number;
  childName?: string;
  date?: string;
  categories?: string[];
  content?: string;
  nextSteps?: string;
}
