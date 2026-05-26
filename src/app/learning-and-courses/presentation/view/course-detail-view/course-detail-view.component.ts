import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonItemComponent } from '../../components/lesson-item/lesson-item.component';
import { LearningProgressComponent } from '../../components/learning-progress/learning-progress.component';

@Component({
  selector: 'app-course-detail-view',
  standalone: true,
  imports: [
    CommonModule,
    LessonItemComponent,
    LearningProgressComponent
  ],
  templateUrl: './course-detail-view.component.html',
  styleUrls: ['./course-detail-view.component.css']
})
export class CourseDetailViewComponent {

  public lessons = [
    { title: 'Introduction', completed: true },
    { title: 'Therapy Techniques', completed: true },
    { title: 'Live Interaction', completed: false },
    { title: 'Evaluation', completed: false }
  ];

  public updateLesson(index: number, completed: boolean) {
    this.lessons[index].completed = completed;
  }

  public get completedLessons(): number {
    return this.lessons.filter(l => l.completed).length;
  }
}
