import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const MainRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'invoice',
        loadChildren: () =>
          import('./invoice/invoice.routes').then((m) => m.InoviceRoutes),
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
        path: 'establishments',
        loadChildren: () =>
          import('./establishments/establishments.routes').then((m) => m.EstablishmentsRoutes),
      },
      {
        path: 'taxes',
        loadChildren: () =>
          import('./taxes/taxes.routes').then((m) => m.TaxesRoutes),
      },
      {
        path: '**',
        redirectTo: 'users',
        pathMatch: 'full',
      },

    ],
  },
];
