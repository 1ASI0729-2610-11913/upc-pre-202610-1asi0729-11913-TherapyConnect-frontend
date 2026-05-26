import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-learning-tracker-view',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './learning-tracker-view.component.html',
  styleUrls: ['./learning-tracker-view.component.css']
})
export class LearningTrackerViewComponent implements OnInit {

  public readonly weeklyStudyHours = signal(14);

  public readonly completedCourses = signal(0);

  public readonly activeCourses = signal(0);

  public readonly learningStreak = signal(18);

  public readonly monthlyGoal = signal(20);

  public readonly completedGoal = computed(() => {
    const goal = this.monthlyGoal();
    if (goal === 0) return 0;
    return Math.round((this.weeklyStudyHours() / goal) * 100);
  });

  public readonly weeklyActivity = signal([
    { day: 'Monday', hours: 2 },
    { day: 'Tuesday', hours: 1 },
    { day: 'Wednesday', hours: 3 },
    { day: 'Thursday', hours: 2 },
    { day: 'Friday', hours: 4 },
    { day: 'Saturday', hours: 1 },
    { day: 'Sunday', hours: 1 }
  ]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch courses to compute totals
    this.http.get<any[]>('/api/courses').subscribe(courses => {
      this.completedCourses.set(courses.filter(c => c.completed).length ?? 0);
      this.activeCourses.set(courses.filter(c => !c.completed).length ?? courses.length);
    }, err => console.error('Failed to load courses for tracker', err));

    // Alternatively load registrations for active courses
    this.http.get<any[]>('/api/registrations').subscribe(regs => {
      this.activeCourses.set(regs.length);
    }, () => {});
  }
}
