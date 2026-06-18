import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Course } from '../domain/model/course.entity';
import { CourseResource, CourseResponse} from './course-response';

export class CourseAssembler {
  static toEntitiesFromResponse(response: CourseResponse): Course[] {
    return response.courses.map((r) => this.toEntityFromResource(r));
  }

  static toEntitiesFromResources(resources: CourseResource[]): Course[] {
    return resources.map((r) => this.toEntityFromResource(r));
  }

  static toEntityFromResource(resource: CourseResource): Course {
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

  static toResourceFromEntity(entity: Course): CourseResource {
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
