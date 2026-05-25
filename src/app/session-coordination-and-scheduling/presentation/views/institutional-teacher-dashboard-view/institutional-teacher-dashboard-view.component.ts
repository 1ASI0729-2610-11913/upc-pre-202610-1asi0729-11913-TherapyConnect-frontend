import { Component } from '@angular/core';
import { DashboardLayoutComponent } from '../../../../shared/presentation/layouts/dashboard-layout/dashboard-layout.component';
import { DashboardWelcomeComponent } from '../../../../shared/presentation/components/dashboard-welcome/dashboard-welcome.component';

@Component({
  selector: 'app-institutional-teacher-dashboard-view',
  standalone: true,
  imports: [DashboardLayoutComponent, DashboardWelcomeComponent],
  templateUrl: './institutional-teacher-dashboard-view.component.html',
  styleUrl: './institutional-teacher-dashboard-view.component.css',
})
export class InstitutionalTeacherDashboardViewComponent {}
