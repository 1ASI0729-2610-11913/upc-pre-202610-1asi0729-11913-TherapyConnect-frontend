import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface CourseResponse extends BaseResponse {
  courses: CourseResource[];
}

export interface CourseResource extends BaseResource {
  id: number;
  titleCourse: string;
  stateCourse: string;
  categoryNeed: string;
  moduleName: string;
  moduleState: string;
  contentType: string;
  contentState: string;
  progressPercentage: number;
  progressState: string;
  improvementIndicator: string;
}
