import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { CourseAndLearningManagmentStore } from '../../../application/course-and-learning-managment-store';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CourseStatisticsComponent } from '../../components/course-statistics/course-statistics.component';
import { DashboardLayoutComponent } from '../../../../shared/presentation/layouts/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-course-dashboard-view',
  standalone: true,
  imports: [CommonModule, DashboardLayoutComponent, CourseCardComponent, CourseStatisticsComponent],
  templateUrl: './course-dashboard-view.component.html',
  styleUrls: ['./course-dashboard-view.component.css'],
})
export class CourseDashboardViewComponent {
  protected readonly store = inject(CourseAndLearningManagmentStore);

  readonly courses = this.store.courses();
  readonly totalCourses = this.store.courses().length;
  readonly activeCoursesCount = this.store.registrations;
}
