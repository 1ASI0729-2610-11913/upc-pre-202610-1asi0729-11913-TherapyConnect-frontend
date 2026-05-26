import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CourseStatisticsComponent } from '../../components/course-statistics/course-statistics.component';
import { DashboardLayoutComponent } from '../../../../shared/presentation/layouts/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-course-dashboard-view',
  standalone: true,
  imports: [
    CommonModule,
    DashboardLayoutComponent,
    CourseCardComponent,
    CourseStatisticsComponent
  ],
  templateUrl: './course-dashboard-view.component.html',
  styleUrls: ['./course-dashboard-view.component.css']
})
export class CourseDashboardViewComponent {

  public courses = [
    {
      title: 'Speech Therapy Fundamentals',
      description: 'Introduction to therapeutic speech exercises.',
      instructor: 'Dr. Maria Lopez',
      progress: 75,
      category: 'Speech'
    },
    {
      title: 'Behavioral Development',
      description: 'Understanding behavioral patterns in children.',
      instructor: 'Dr. Carlos Diaz',
      progress: 45,
      category: 'Psychology'
    }
  ];
}
