import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { InvoiceComponent } from './invoice/invoice.component';

export const MainRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'invoice',
        component: InvoiceComponent,
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/user.routes').then((m) => m.UserRoutes),
      },
      {
        path: 'clients',
        loadChildren: () =>
          import('./clients/client.routes').then((m) => m.ClientRoutes),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.routes').then((m) => m.ProductsRoutes),
      
      },
      {
        path: '**',
        redirectTo: 'users',
        pathMatch: 'full',
      },
    ],
  },
];
