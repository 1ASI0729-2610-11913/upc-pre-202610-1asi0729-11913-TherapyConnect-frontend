import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Course } from '../domain/model/course.entity';
import { CourseAssembler } from './course-assembler';
import { CourseResource, CourseResponse } from './course-response';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';

export class CoursesApiEndpoint extends BaseApiEndpoint<Course, CourseResource, CourseResponse, CourseAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderCoursesEndpointPath}`,
      new CourseAssembler(),
    );
  }
}
