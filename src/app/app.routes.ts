import { Routes } from '@angular/router';
import { navigationContextReadyGuard } from './shared/presentation/services/navigation/navigation-context-ready.guard';
import { emergencyRoutes } from './emergency-management/presentation/views/emergency.routes';
import { sessionCoordinationAndSchedulingRoutes } from './session-coordination-and-scheduling/presentation/session-coordination-and-scheduling.routes';

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
        path: 'profesor-personal-calendar',
        loadComponent: () =>
          import('./session-coordination-and-scheduling/presentation/views/profesor-plan-personal/profesor-plan-personal.component').then(
            (m) => m.ProfesorPlanPersonalComponent,
          ),
      },
      {
        path: 'padre-personal-calendar',
        loadComponent: () =>
          import('./session-coordination-and-scheduling/presentation/views/padre-plan-personal/padre-plan-personal.component').then(
            (m) => m.PadrePlanPersonalComponent,
          ),
      },
      {
        path: 'padre-institucional-calendar',
        loadComponent: () =>
          import('./session-coordination-and-scheduling/presentation/views/padre-plan-institucional/padre-plan-institucional.component').then(
            (m) => m.PadrePlanInstitucionalComponent,
          ),
      },
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
        path: 'institutional-teacher-notes',
        loadComponent: () =>
          import('./progress-and-tracking/presentation/views/institutional-teacher-notes/institutional-teacher-notes.component').then(
            (m) => m.InstitutionalTeacherNotesComponent,
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
        path: 'scheduling',
        loadChildren: () =>
          import('./session-coordination-and-scheduling/presentation/session-coordination-and-scheduling.routes').then(
            (m) => m.sessionCoordinationAndSchedulingRoutes,
          ),
      },
      {
        path: 'emergency',
        loadChildren: () =>
          import('./emergency-management/presentation/views/emergency.routes').then(
            (m) => m.emergencyRoutes,
          ),
      },
      {
        path: 'emergency-management',
        children: emergencyRoutes,
      },
      {
        path: 'session-coordination-and-scheduling',
        children: sessionCoordinationAndSchedulingRoutes,
      },
    ],
  },
  { path: 'live-session', redirectTo: 'app/sessions/live' },
  { path: '**', redirectTo: 'welcome' },
];
