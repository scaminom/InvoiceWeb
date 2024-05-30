import { Routes } from '@angular/router';
import { InvoiceComponent } from './core/invoice/invoice.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.routes').then(m => m.AuthRoutes)
  },
  {
    path: 'invoice',
    component: InvoiceComponent
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
