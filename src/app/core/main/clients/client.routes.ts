import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { CreateClientPageComponente } from './pages/create-client-page/create-client-page.component';
import { EditClientPageComponent } from './pages/edit-client-page/edit-client-page.component';
import { ClientTablePageComponent } from './pages/client-table-page/client-table-page.component';

export const ClientRoutes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: 'new-client', component: CreateClientPageComponente },
      { path: 'edit-client/:id', component: EditClientPageComponent },
      { path: 'clientList', component: ClientTablePageComponent },
      { path: '**', redirectTo: 'clientList' },
    ],
  },
];
