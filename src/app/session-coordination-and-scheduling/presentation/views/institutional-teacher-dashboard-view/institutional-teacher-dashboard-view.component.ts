import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardLayoutComponent } from '../../../../shared/presentation/layouts/dashboard-layout/dashboard-layout.component';
import { CalendarViewComponent } from '../../components/calendar-view/calendar-view.component';
import { SessionCoordinationAndSchedulingStore } from '../../../application/session-coordination-and-scheduling-store';

@Component({
  selector: 'app-institutional-teacher-dashboard-view',
  standalone: true,
  imports: [DashboardLayoutComponent, CalendarViewComponent, RouterLink],
  templateUrl: './institutional-teacher-dashboard-view.component.html',
  styleUrl: './institutional-teacher-dashboard-view.component.css'
})
export class InstitutionalTeacherDashboardViewComponent {
  protected readonly store = inject(SessionCoordinationAndSchedulingStore);
}
