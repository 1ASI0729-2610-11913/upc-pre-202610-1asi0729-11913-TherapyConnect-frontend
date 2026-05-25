import { Component } from '@angular/core';
import { DashboardLayoutComponent } from '../../../../shared/presentation/layouts/dashboard-layout/dashboard-layout.component';
import { DashboardWelcomeComponent } from '../../../../shared/presentation/components/dashboard-welcome/dashboard-welcome.component';

@Component({
  selector: 'app-institution-admin-dashboard-view',
  standalone: true,
  imports: [DashboardLayoutComponent, DashboardWelcomeComponent],
  templateUrl: './institution-admin-dashboard-view.component.html',
  styleUrl: './institution-admin-dashboard-view.component.css',
})
export class InstitutionAdminDashboardViewComponent {}
