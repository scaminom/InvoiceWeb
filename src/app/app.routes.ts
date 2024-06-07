import { Routes } from '@angular/router';
import { publicGuard } from './shared/guards/public.guard';
import { authGuard } from './core/auth/guards/auth.guard';
import { authResolver } from './core/auth/resolvers/auth.resolver';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.routes').then((m) => m.AuthRoutes),
    canActivate: [publicGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./core/main/main.routes').then((m) => m.MainRoutes),
    // resolve: {
    //   auth: authResolver,
    // },
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
