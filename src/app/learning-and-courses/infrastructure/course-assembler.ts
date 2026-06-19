import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Course } from '../domain/model/course.entity';
import { CourseResource, CourseResponse} from './course-response';

export class CourseAssembler implements BaseAssembler<Course, CourseResource, CourseResponse> {
  toEntitiesFromResponse(response: CourseResponse): Course[] {
    return response.courses.map((r) => this.toEntityFromResource(r));
  }

  toEntityFromResource(resource: CourseResource): Course {
    return new Course({
      id: resource.id,
      titleCourse: resource.titleCourse,
      stateCourse: resource.stateCourse,
      categoryNeed: resource.categoryNeed,
      moduleName: resource.moduleName,
      moduleState: resource.moduleState,
      contentType: resource.contentType,
      contentState: resource.contentState,
      progressPercentage: resource.progressPercentage,
      progressState: resource.progressState,
      improvementIndicator: resource.improvementIndicator,
    });
  }

  toResourceFromEntity(entity: Course): CourseResource {
    return {
      id: entity.id,
      titleCourse: entity.titleCourse,
      stateCourse: entity.stateCourse,
      categoryNeed: entity.categoryNeed,
      moduleName: entity.moduleName,
      moduleState: entity.moduleState,
      contentType: entity.contentType,
      contentState: entity.contentState,
      progressPercentage: entity.progressPercentage,
      progressState: entity.progressState,
      improvementIndicator: entity.improvementIndicator,
    }
  }
}
