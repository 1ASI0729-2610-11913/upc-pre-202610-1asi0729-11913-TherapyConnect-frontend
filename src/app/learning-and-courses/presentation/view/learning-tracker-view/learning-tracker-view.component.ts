import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-learning-tracker-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learning-tracker-view.component.html',
  styleUrls: ['./learning-tracker-view.component.css']
})
export class LearningTrackerViewComponent {

  public readonly weeklyStudyHours = signal(14);

  public readonly completedCourses = signal(6);

  public readonly activeCourses = signal(3);

  public readonly learningStreak = signal(18);

  public readonly monthlyGoal = signal(20);

  public readonly completedGoal = computed(() => {

    const goal = this.monthlyGoal();

    if (goal === 0) return 0;

    return Math.round(
      (this.weeklyStudyHours() / goal) * 100
    );
  });

  public readonly weeklyActivity = signal([
    {
      day: 'Monday',
      hours: 2
    },
    {
      day: 'Tuesday',
      hours: 1
    },
    {
      day: 'Wednesday',
      hours: 3
    },
    {
      day: 'Thursday',
      hours: 2
    },
    {
      day: 'Friday',
      hours: 4
    },
    {
      day: 'Saturday',
      hours: 1
    },
    {
      day: 'Sunday',
      hours: 1
    }
  ]);
}
