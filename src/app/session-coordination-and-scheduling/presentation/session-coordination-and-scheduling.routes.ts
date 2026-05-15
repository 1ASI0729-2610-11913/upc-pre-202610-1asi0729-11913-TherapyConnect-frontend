import { Routes } from '@angular/router';

const eventoList = () => import('./views/evento/evento-list').then((m) => m.EventoList);
const eventoForm = () => import('./views/evento/evento-form').then((m) => m.EventoForm);
const recordatorioList = () => import('./views/recordatorio/recordatorio-list').then((m) => m.RecordatorioList);
const recordatorioForm = () => import('./views/recordatorio/recordatorio-form').then((m) => m.RecordatorioForm);

export const sessionCoordinationAndSchedulingRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'eventos' },
  { path: 'eventos/new', loadComponent: eventoForm },
  { path: 'eventos/edit/:id', loadComponent: eventoForm },
  { path: 'eventos', loadComponent: eventoList },
  { path: 'recordatorios/new', loadComponent: recordatorioForm },
  { path: 'recordatorios/edit/:id', loadComponent: recordatorioForm },
  { path: 'recordatorios', loadComponent: recordatorioList },
];
