import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UsersComponent } from './features/users/users.component';
import { SettingsComponent } from './features/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
