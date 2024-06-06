import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { UserTablePageComponent } from './pages/user-table-page/user-table-page.component';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { CreateUserPageComponent } from './pages/create-user-page/create-user-page.component';

export const UserRoutes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'new-user', component: CreateUserPageComponent },
      { path: 'edit-user/:id', component: EditUserPageComponent },
      { path: 'userList', component: UserTablePageComponent },
      { path: '**', redirectTo: 'userList' },
    ],
  },
];
