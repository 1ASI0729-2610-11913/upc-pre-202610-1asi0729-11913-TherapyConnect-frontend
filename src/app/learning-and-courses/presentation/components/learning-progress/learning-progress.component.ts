import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-learning-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learning-progress.component.html',
  styleUrls: ['./learning-progress.component.css']
})
export class LearningProgressComponent {
  @Input() completedLessons: number = 0;
  @Input() totalLessons: number = 0;

  get percentage(): number {
    if (this.totalLessons === 0) return 0;
    return Math.round((this.completedLessons / this.totalLessons) * 100);
  }
}
