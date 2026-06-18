import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { CourseAndLearningManagmentStore } from '../../../application/course-and-learning-managment-store';
import { LessonItemComponent } from '../../components/lesson-item/lesson-item.component';
import { LearningProgressComponent } from '../../components/learning-progress/learning-progress.component';

@Component({
  selector: 'app-course-detail-view',
  standalone: true,
  imports: [CommonModule, LessonItemComponent, LearningProgressComponent],
  templateUrl: './course-detail-view.component.html',
  styleUrls: ['./course-detail-view.component.css'],
})
export class CourseDetailViewComponent implements OnChanges {
  protected readonly store = inject(CourseAndLearningManagmentStore);

  @Input() courseId: string | number | null = null;

  public lessons: { title: string; completed: boolean }[] = [
    { title: 'Introduction', completed: true },
    { title: 'Therapy Techniques', completed: true },
    { title: 'Live Interaction', completed: false },
    { title: 'Evaluation', completed: false },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseId'] && this.courseId != null) {
      const found = this.store.courses().find((c) => c.id === Number(this.courseId));
      if (found) this.store.selectCourse(found);
    }
  }

  public updateLesson(index: number, completed: boolean): void {
    this.lessons[index].completed = completed;
  }

  public get completedLessons(): number {
    return this.lessons.filter((l) => l.completed).length;
  }
}
