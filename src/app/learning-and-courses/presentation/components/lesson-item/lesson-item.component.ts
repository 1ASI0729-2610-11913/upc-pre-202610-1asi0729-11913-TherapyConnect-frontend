import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lesson-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.css']
})
export class LessonItemComponent {
  @Input() lessonTitle: string = '';
  @Input() completed: boolean = false;

  @Output() completedChange = new EventEmitter<boolean>();

  toggleCompleted() {
    this.completed = !this.completed;
    this.completedChange.emit(this.completed);
  }
}
