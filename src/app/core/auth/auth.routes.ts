import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const AuthRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: '**', redirectTo: 'login' }
    ]
  }
]
