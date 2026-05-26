import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    CourseStatisticsComponent,
    HttpClientModule
  ],
  templateUrl: './course-dashboard-view.component.html',
  styleUrls: ['./course-dashboard-view.component.css']
})
export class CourseDashboardViewComponent implements OnInit {

  public courses: any[] = [];
  public totalCourses = 0;
  public activeCoursesCount = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Load courses from backend
    this.http.get<any[]>('/api/courses').subscribe(courses => {
      this.courses = courses.map(c => ({
        title: c.title ?? c.name ?? 'Untitled',
        description: c.description ?? '',
        instructor: c.instructor ?? c.teacher ?? '',
        progress: c.progress ?? 0,
        category: c.category ?? ''
      }));
      this.totalCourses = this.courses.length;
    }, err => {
      console.error('Failed to load courses', err);
    });

    // Load registrations to estimate active courses
    this.http.get<any[]>('/api/registrations').subscribe(regs => {
      this.activeCoursesCount = regs.length;
    }, () => {});
  }
}
