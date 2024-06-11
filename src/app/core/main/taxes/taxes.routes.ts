import { Routes } from '@angular/router';
import { TaxesLayoutComponent } from './layout/layout.component';
import { TaxTablePageComponent } from './pages/tax-table-page/tax-table-page.component';
import { TaxCreateFormComponent } from './pages/tax-create-form/tax-create-form.component';
import { TaxUpdateFormComponent } from './pages/tax-update-form/tax-update-form.component';


export const TaxesRoutes: Routes = [
  {
    path: '',
    component: TaxesLayoutComponent,
    children: [ // Redirigir a product-table por defecto
      { path: 'lists', component:  TaxTablePageComponent},
      { path: 'create', component: TaxCreateFormComponent },
      { path: 'edit/:id', component: TaxUpdateFormComponent },
      { path: '', redirectTo: 'lists', pathMatch: 'full' },
    ],
  },
];
