import { Routes } from '@angular/router';

const emergencyList = () => import('./emergency-list/emergency-list').then((m) => m.EmergencyList);
const emergencyForm = () => import('./emergency-form/emergency-form').then((m) => m.EmergencyForm);

export const emergencyRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'emergencies' },
  { path: 'emergencies', loadComponent: emergencyList },
  { path: 'emergencies/new', loadComponent: emergencyForm },
  { path: 'emergencies/edit/:id', loadComponent: emergencyForm },
];
