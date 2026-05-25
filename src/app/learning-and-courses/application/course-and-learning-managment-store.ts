import { computed, inject, Injectable, signal } from '@angular/core';
import { Course } from '../domain/model/course.entity'
import { Registration } from '../domain/model/registration.entity';
import { Evaluation } from '../domain/model/evaluation.entity';
import { Observation } from '../domain/model/observation.entity';
import { CourseLearningManagmentApi } from '../infrastructure/course-and-learning-managment-api';

@Injectable({ providedIn: 'root' })
export class CourseAndLearningManagmentStore {
  private readonly api = inject(CourseLearningManagmentApi);

  private readonly coursesSignal = signal<Course[]>([]);
  private readonly registrationSignal = signal<Registration[]>([]);
  private readonly evaluationSignal = signal<Evaluation[]>([]);
  private readonly observationsSignal = signal<Observation[]>([]);
  private readonly selectedCourseSignal = signal<Course | null>(null);
  private readonly selectedEvaluationSignal = signal<Evaluation | null>(null);
  private readonly selectedObservationnSignal = signal<Observation | null>(null);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly courses = this.coursesSignal.asReadonly();
  readonly registrations = this.registrationSignal.asReadonly();
  readonly evaluations = this.evaluationSignal.asReadonly();
  readonly observations = this.observationsSignal.asReadonly();
  readonly selectedCourse = this.selectedCourseSignal.asReadonly();
  readonly selectedEvaluation = this.selectedEvaluationSignal.asReadonly();
  readonly selectedObservation = this.selectedObservationnSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly completedCount = computed(() => this.courses().filter((s) => s.stateCourse === 'completed').length);
  readonly cancelledCount = computed(() => this.courses().filter((s) => s.stateCourse === 'cancelled').length);

  constructor() {
    this.loadCourses();
    this.loadRegistrations();
    this.loadEvaluations();
    this.loadObservations();
  }

  loadCourses(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.api.getCourses().subscribe({
      next: (courses) => {
        this.coursesSignal.set(courses);
        if (!this.selectedCourseSignal() && courses.length > 0) {
          this.selectedCourseSignal.set(courses[0]);
        }
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set('No se pudo cargar todos los cursos');
        this.loadingSignal.set(false);
      },
    });
  }

  loadRegistrations(): void {
    this.api.getRegistrations().subscribe({
      next: (registrations) => this.registrationSignal.set(registrations),
      error: () => this.registrationSignal.set([]),
    });
  }

  loadEvaluations(): void {
    this.api.getEvaluations().subscribe({
      next: (evaluations) => this.evaluationSignal.set(evaluations),
      error: () => this.evaluationSignal.set([]),
    });
  }

  loadObservations(): void {
    this.api.getObservations().subscribe({
      next: (observations) => this.observationsSignal.set(observations),
      error: () => this.observationsSignal.set([]),
    });
  }

  selectCourse(course: Course): void {
    this.selectedCourseSignal.set(course);
  }

  selectEvaluation(evaluation: Evaluation): void {
    this.selectedEvaluationSignal.set(evaluation);
  }

  toggleEvaluationState(id: number): void {
    this.evaluationSignal.update((items) =>
      items.map((item) => {
        if (item.id !== id) return item;
        return new Evaluation({
          id: item.id,
          courseId: item.courseId,
          evaluationState: item.evaluationState === 'completed' ? 'pending' : 'completed',
          evaluationScore: item.evaluationScore,
          answer: item.answer,
          certificationState: item.certificationState,
        });
      }),
    );
  }

  selectObservation(observation: Observation): void {
    this.selectedObservationnSignal.set(observation);
  }
}
