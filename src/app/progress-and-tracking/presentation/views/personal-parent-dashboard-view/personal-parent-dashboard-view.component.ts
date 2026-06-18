import { Component } from '@angular/core';
import { DashboardLayoutComponent } from '../../../../shared/presentation/layouts/dashboard-layout/dashboard-layout.component';
import { DashboardWelcomeComponent } from '../../../../shared/presentation/components/dashboard-welcome/dashboard-welcome.component';

@Component({
  selector: 'app-personal-parent-dashboard-view',
  standalone: true,
  imports: [DashboardLayoutComponent, DashboardWelcomeComponent],
  templateUrl: './personal-parent-dashboard-view.component.html',
  styleUrl: './personal-parent-dashboard-view.component.css',
})
export class PersonalParentDashboardViewComponent {}
