import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.routes').then(m => m.AuthRoutes)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./core/main/main.routes').then(m => m.MainRoutes)
  },
  {
    path: '',
    redirectTo: 'invoice',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'invoice'
  }

];
