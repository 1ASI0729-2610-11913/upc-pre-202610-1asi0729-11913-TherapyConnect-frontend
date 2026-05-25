import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Course } from '../domain/model/course.entity';
import { Registration } from '../domain/model/registration.entity';
import { Evaluation } from '../domain/model/evaluation.entity';
import { Observation } from '../domain/model/observation.entity';
import { CoursesApiEndpoint } from './courses-api-endpoint';
import { RegistrationsApiEndpoint } from './registrations-api-endpoint';
import { EvaluationsApiEndpoint } from './evaluations-api-endpoint';
import { ObservationsApiEndpoint } from './observations-api-endpoint';

@Injectable({ providedIn: 'root' })
export class CourseLearningManagmentApi extends BaseApi {
  private readonly coursesEndpoint: CoursesApiEndpoint;
  private readonly registrationsEndpoint: RegistrationsApiEndpoint;
  private readonly evaluationsEndpoint: EvaluationsApiEndpoint;
  private readonly observationsEndpoint: ObservationsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.coursesEndpoint = new CoursesApiEndpoint(http);
    this.registrationsEndpoint = new RegistrationsApiEndpoint(http);
    this.evaluationsEndpoint = new EvaluationsApiEndpoint(http);
    this.observationsEndpoint = new ObservationsApiEndpoint(http);
  }

  getCourses(): Observable<Course[]> {
    return this.coursesEndpoint.getAll();
  }
  getCourse(id: number): Observable<Course> {
    return this.coursesEndpoint.getById(id);
  }
  createCourse(course: Course): Observable<Course> {
    return this.coursesEndpoint.create(course);
  }
  updateCourse(course: Course): Observable<Course> {
    return this.coursesEndpoint.update(course, course.id);
  }
  deleteCourse(id: number): Observable<void> {
    return this.coursesEndpoint.delete(id);
  }

  getRegistrations(): Observable<Registration[]> {
    return this.registrationsEndpoint.getAll();
  }
  getRegistration(id: number): Observable<Registration> {
    return this.registrationsEndpoint.getById(id);
  }
  createRegistration(registration: Registration): Observable<Registration> {
    return this.registrationsEndpoint.create(registration);
  }
  updateRegistration(registration: Registration): Observable<Registration> {
    return this.registrationsEndpoint.update(registration, registration.id);
  }
  deleteRegistration(id: number): Observable<void> {
    return this.registrationsEndpoint.delete(id);
  }

  getEvaluations(): Observable<Evaluation[]> {
    return this.evaluationsEndpoint.getAll();
  }
  getEvaluation(id: number): Observable<Evaluation> {
    return this.evaluationsEndpoint.getById(id);
  }
  createEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    return this.evaluationsEndpoint.create(evaluation);
  }
  updateEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    return this.evaluationsEndpoint.update(evaluation, evaluation.id);
  }
  deleteEvaluation(id: number): Observable<void> {
    return this.evaluationsEndpoint.delete(id);
  }

  getObservations(): Observable<Observation[]> {
    return this.observationsEndpoint.getAll();
  }
  getObservation(id: number): Observable<Observation> {
    return this.observationsEndpoint.getById(id);
  }
  createObservation(observation: Observation): Observable<Observation> {
    return this.observationsEndpoint.create(observation);
  }
  updateObservation(observation: Observation): Observable<Observation> {
    return this.observationsEndpoint.update(observation, observation.id);
  }
  deleteObservation(id: number): Observable<void> {
    return this.observationsEndpoint.delete(id);
  }
}
