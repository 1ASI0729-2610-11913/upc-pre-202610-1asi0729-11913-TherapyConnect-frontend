import { Routes } from '@angular/router';
import { navigationContextReadyGuard } from './shared/presentation/services/navigation/navigation-context-ready.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./iam/presentation/views/plan-role-selector-view/plan-role-selector-view.component').then(
        (m) => m.PlanRoleSelectorViewComponent,
      ),
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./shared/presentation/layouts/app-shell-layout/app-shell-layout.component').then(
        (m) => m.AppShellLayoutComponent,
      ),
    canActivate: [navigationContextReadyGuard],
    children: [
      {
        path: 'personal-parent-dashboard',
        loadComponent: () =>
          import('./progress-and-tracking/presentation/views/personal-parent-dashboard-view/personal-parent-dashboard-view.component').then(
            (m) => m.PersonalParentDashboardViewComponent,
          ),
      },
      {
        path: 'personal-teacher-dashboard',
        loadComponent: () =>
          import('./session-and-live-interaction/presentation/views/personal-teacher-dashboard-view/personal-teacher-dashboard-view.component').then(
            (m) => m.PersonalTeacherDashboardViewComponent,
          ),
      },
      {
        path: 'institutional-parent-dashboard',
        loadComponent: () =>
          import('./session-and-live-interaction/presentation/views/institutional-parent-dashboard-view/institutional-parent-dashboard-view.component').then(
            (m) => m.InstitutionalParentDashboardViewComponent,
          ),
      },
      {
        path: 'institutional-teacher-dashboard',
        loadComponent: () =>
          import('./session-coordination-and-scheduling/presentation/views/institutional-teacher-dashboard-view/institutional-teacher-dashboard-view.component').then(
            (m) => m.InstitutionalTeacherDashboardViewComponent,
          ),
      },
      {
        path: 'institutional-admin-dashboard',
        loadComponent: () =>
          import('./institutional-management/presentation/views/institution-admin-dashboard-view/institution-admin-dashboard-view.component').then(
            (m) => m.InstitutionAdminDashboardViewComponent,
          ),
      },
      {
        path: 'marketplace',
        loadComponent: () =>
          import('./marketplace-and-recommendations/presentation/view/marketplace-dashboard-view/marketplace-dashboard-view.component').then(
            (m) => m.MarketplaceDashboardViewComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'welcome' },
];
