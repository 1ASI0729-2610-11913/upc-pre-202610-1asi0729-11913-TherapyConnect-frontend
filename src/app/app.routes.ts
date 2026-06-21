import { Routes } from '@angular/router';
import { navigationContextReadyGuard } from './shared/presentation/services/navigation/navigation-context-ready.guard';
import { emergencyRoutes } from './emergency-management/presentation/views/emergency.routes';
import { sessionCoordinationAndSchedulingRoutes } from './session-coordination-and-scheduling/presentation/session-coordination-and-scheduling.routes';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () =>
      import('./iam/presentation/views/login-view/login-view.component').then(
        (m) => m.LoginViewComponent,
      ),
  },
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
        path: 'institutional-teacher-notes',
        loadComponent: () =>
          import('./progress-and-tracking/presentation/views/institutional-teacher-notes/institutional-teacher-notes.component').then(
            (m) => m.InstitutionalTeacherNotesComponent,
          ),
      },
      {
        path: 'personal-teacher-notes',
        loadComponent: () =>
          import('./progress-and-tracking/presentation/views/personal-teacher-notes/personal-teacher-notes.component').then(
            (m) => m.PersonalTeacherNotesComponent,
          ),
      },
      {
        path: 'personal-parent-notes',
        loadComponent: () =>
          import('./progress-and-tracking/presentation/views/personal-parent-notes/personal-parent-notes.component').then(
            (m) => m.PersonalParentNotesComponent,
          ),
      },
      {
        path: 'emergency-management',
        children: emergencyRoutes,
      },
      {
        path: 'scheduling',
        children: sessionCoordinationAndSchedulingRoutes,
      },
      {
        path: 'sessions',
        loadComponent: () =>
          import('./session-and-live-interaction/presentation/views/session-menu-view/session-menu-view.component').then(
            (m) => m.SessionMenuViewComponent,
          ),
      },
      {
        path: 'sessions/live',
        loadComponent: () =>
          import('./session-and-live-interaction/presentation/views/live-session-view/live-session-view.component').then(
            (m) => m.LiveSessionViewComponent,
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
