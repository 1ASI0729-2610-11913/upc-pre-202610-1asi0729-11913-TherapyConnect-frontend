import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-statistics.component.html',
  styleUrls: ['./course-statistics.component.css']
})
export class CourseStatisticsComponent {
  @Input() totalCourses: number = 0;
  @Input() activeCourses: number = 0;
  @Input() completedCourses: number = 0;
}
