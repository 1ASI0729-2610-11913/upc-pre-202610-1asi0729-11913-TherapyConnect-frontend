import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { LessonItemComponent } from '../../components/lesson-item/lesson-item.component';
import { LearningProgressComponent } from '../../components/learning-progress/learning-progress.component';

@Component({
  selector: 'app-course-detail-view',
  standalone: true,
  imports: [
    CommonModule,
    LessonItemComponent,
    LearningProgressComponent,
    HttpClientModule
  ],
  templateUrl: './course-detail-view.component.html',
  styleUrls: ['./course-detail-view.component.css']
})
export class CourseDetailViewComponent implements OnChanges {

  @Input() courseId: string | number | null = null;

  public lessons: { title: string; completed: boolean }[] = [
    { title: 'Introduction', completed: true },
    { title: 'Therapy Techniques', completed: true },
    { title: 'Live Interaction', completed: false },
    { title: 'Evaluation', completed: false }
  ];

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.courseId && this.courseId != null) {
      this.http.get<any>(`/api/courses/${this.courseId}`).subscribe(course => {
        // Prefer course.lessons if provided by backend
        if (course?.lessons && Array.isArray(course.lessons)) {
          this.lessons = course.lessons.map((l: any) => ({
            title: l.title ?? l.name ?? 'Untitled',
            completed: !!l.completed
          }));
        } else if (course?.modules && Array.isArray(course.modules)) {
          this.lessons = course.modules.map((m: any) => ({ title: m.title ?? m.name ?? 'Untitled', completed: !!m.completed }));
        } else {
          // Keep default fallback or derive small info
          if (course?.title) {
            // ensure at least the course title is visible as first lesson
            this.lessons = [{ title: course.title, completed: false }];
          }
        }
      }, err => console.error('Failed to load course detail', err));
    }
  }

  public updateLesson(index: number, completed: boolean) {
    this.lessons[index].completed = completed;
  }

  public get completedLessons(): number {
    return this.lessons.filter(l => l.completed).length;
  }
}
