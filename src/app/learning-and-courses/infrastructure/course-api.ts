import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Course } from '../domain/model/course.entity';
import { CourseAssembler } from './course-assembler';
import { CourseResource, CourseResponse } from './course-response';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CourseApi {
  private baseUrl = environment.platformProviderApiBaseUrl;
  private endpoint = environment.platformProviderCoursesEndpointPath;
  private http = inject(HttpClient);

  getCourses(): Observable<Course[]> {
    return this.http
      .get<CourseResponse | CourseResource[]>(`${this.baseUrl}${this.endpoint}`)
      .pipe(
        map((response) =>
          Array.isArray(response)
            ? CourseAssembler.toEntitiesFromResources(response)
            : CourseAssembler.toEntitiesFromResponse(response),
          ),
      );
  }

  createCourse(entity: Course): Observable<Course> {
    const resource = CourseAssembler.toResourceFromEntity(entity);
    return this.http
      .post<CourseResource>(`${this.baseUrl}${this.endpoint}`, resource)
      .pipe(map((response) => CourseAssembler.toEntityFromResource(response)));
  }

  updateCourse(id: number, entity: Course): Observable<Course> {
    const resource = CourseAssembler.toResourceFromEntity(entity);
    return this.http
      .put<CourseResource>(`${this.baseUrl}${this.endpoint}/${id}`, resource)
      .pipe(map((response) => CourseAssembler.toEntityFromResource(response)));
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${this.endpoint}/${id}`)
  }
}
