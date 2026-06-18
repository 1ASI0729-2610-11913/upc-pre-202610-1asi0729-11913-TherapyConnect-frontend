import { Routes } from '@angular/router';

const eventoList = () => import('./views/evento/evento-list').then((m) => m.EventoList);
const eventoForm = () => import('./views/evento/evento-form').then((m) => m.EventoForm);
const recordatorioList = () =>
  import('./views/recordatorio/recordatorio-list').then((m) => m.RecordatorioList);
const recordatorioForm = () =>
  import('./views/recordatorio/recordatorio-form').then((m) => m.RecordatorioForm);
const institutionalTeacherDashboard = () =>
  import('./views/institutional-teacher-dashboard-view/institutional-teacher-dashboard-view.component').then(
    (m) => m.InstitutionalTeacherDashboardViewComponent,
  );

export const sessionCoordinationAndSchedulingRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'calendar' },
  { path: 'calendar', loadComponent: institutionalTeacherDashboard },
  { path: 'eventos', loadComponent: eventoList },
  { path: 'eventos/new', loadComponent: eventoForm },
  { path: 'eventos/edit/:id', loadComponent: eventoForm },
  { path: 'recordatorios', loadComponent: recordatorioList },
  { path: 'recordatorios/new', loadComponent: recordatorioForm },
  { path: 'recordatorios/edit/:id', loadComponent: recordatorioForm },
];
