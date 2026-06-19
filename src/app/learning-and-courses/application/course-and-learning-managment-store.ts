import { computed, inject, Injectable, signal } from '@angular/core';
import { Course } from '../domain/model/course.entity'
import { Registration } from '../domain/model/registration.entity';
import { Evaluation } from '../domain/model/evaluation.entity';
import { Observation } from '../domain/model/observation.entity';
import { CoursesApiEndpoint } from '../infrastructure/courses-api-endpoint';
import { EvaluationsApiEndpoint } from '../infrastructure/evaluations-api-endpoint';
import { ObservationsApiEndpoint } from '../infrastructure/observations-api-endpoint';
import { RegistrationsApiEndpoint } from '../infrastructure/registrations-api-endpoint';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

export type CourseState = '' | 'Completed' | 'Filled' | 'Incomplete' | 'Without starting';
export type AccessState = '' | 'Active' | 'Pending' | 'Suspended';
export type EvaluationState = '' | 'Completed' | 'Pending';
export type ObservationType = '' | 'Participant' | 'Non-Participant';

export const DEFAULT_COURSE_STATES: CourseState[] = ['Completed', 'Filled', 'Incomplete', 'Without starting'];
export const DEFAULT_ACCESS_STATES: AccessState[] = ['Active', 'Pending', 'Suspended'];
export const DEFAULT_EVALUATION_STATES: EvaluationState[] = ['Completed', 'Pending'];
export const DEFAULT_OBSERVATION_TYPES: ObservationType[] = ['Participant', 'Non-Participant'];

export interface Learning {
  courseState: CourseState;
  accessState: AccessState;
  evaluationState: EvaluationState;
  observationType: ObservationType;
}

function emptyLearning(): Learning {
  return {
    courseState: '',
    accessState: '',
    evaluationState: '',
    observationType: '',
  };
}

@Injectable({ providedIn: 'root' })
export class CourseAndLearningManagmentStore {
  private readonly courseApi = inject(CoursesApiEndpoint);
  private readonly evaluationApi = inject(EvaluationsApiEndpoint);
  private readonly observationApi = inject(ObservationsApiEndpoint);
  private readonly registrationApi = inject(RegistrationsApiEndpoint);

  private readonly _courses = signal<Course[]>([]);
  private readonly _evaluations = signal<Evaluation[]>([]);
  private readonly _observations = signal<Observation[]>([]);
  private readonly _registrations = signal<Registration[]>([]);
  private readonly _loading = signal(false);

  readonly courses = this._courses.asReadonly();
  readonly evaluations = this._evaluations.asReadonly();
  readonly observations = this._observations.asReadonly();
  readonly registrations = this._registrations.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly completedCourses = computed(() =>
    this._courses().filter(
      (course) => course.stateCourse === 'Completed',
    ),
  );

  readonly completedEvaluations = computed(() =>
    this._evaluations().filter(
      (evaluation) => evaluation.evaluationState === 'Completed',
    ),
  );

  readonly participants = computed(() =>
    this._observations().filter(
      (observation) => observation.observationType === 'Participant',
    ),
  );

  readonly activeAccess = computed(() =>
    this._registrations().filter(
      (registration) => registration.accessState === 'Active',
    ),
  );

  loadAll(): void {
    this.loadCourses();
    this.loadRegistrations();
    this.loadEvaluations();
    this.loadObservations();
  }

  loadCourses(): void {
    this._loading.set(true);

    this.courseApi
      .getCourses()
      .pipe(
        catchError(() => of([])),
        finalize(() => this._loading.set(false)),
      )
      .subscribe((courses) => {
        this._courses.set(courses);
      });
  }

  loadRegistrations(): void {
    this._loading.set(true);

    this.registrationApi
      .getRegistrations()
      .pipe(
        catchError(() => of([])),
        finalize(() => this._loading.set(false)),
      )
      .subscribe((registrations) => {
        this._registrations.set(registrations);
      });
  }

  loadEvaluations(): void {
    this._loading.set(true);

    this.evaluationApi
      .getEvaluations()
      .pipe(
        catchError(() => of([])),
        finalize(() => this._loading.set(false)),
      )
      .subscribe((evaluations) => {
        this._evaluations.set(evaluations);
      });
  }

  loadObservations(): void {
    this._loading.set(true);

    this.observationApi
      .getObservations()
      .pipe(
        catchError(() => of([])),
        finalize(() => this._loading.set(false)),
      )
      .subscribe((observations) => {
        this._observations.set(observations);
      });
  }

  deleteCourse(id: number): void {
    this._loading.set(true);

    this.courseApi
      .deleteCourse(id)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe(() => {
        this._courses.update((courses) =>
        courses.filter((p) => p.id !== id),
        );
      });
  }

  deleteEvaluation(id: number): void {
    this._loading.set(true);

    this.evaluationApi
      .deleteEvaluation(id)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe(() => {
        this._evaluations.update((evaluations) =>
        evaluations.filter((p) => p.id !== id),
        );
      });
  }

  deleteObservation(id: number): void {
    this._loading.set(true);

    this.observationApi
      .deleteObservation(id)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe(() => {
        this._observations.update((observations) =>
        observations.filter((p) => p.id !== id),
        );
      });
  }

  deleteRegistration(id: number): void {
    this._loading.set(true);

    this.registrationApi
      .deleteRegistration(id)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe(() => {
        this._registrations.update((registrations) =>
        registrations.filter((p) => p.id !== id),
        );
      });
  }

  findCourseById(id: number): Course | undefined {
    return this._courses().find((course) => course.id === id);
  }

  findEvaluationById(id: number): Evaluation | undefined {
    return this._evaluations().find((evaluation) => evaluation.id === id);
  }

  findObservationById(id: number): Observation | undefined {
    return this._observations().find((observation) => observation.id === id);
  }

  findRegistrationById(id: number): Registration | undefined {
    return this._registrations().find((registration) => registration.id === id);
  }
}
