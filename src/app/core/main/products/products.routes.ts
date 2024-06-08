import { Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductTableComponent } from './pages/product-table/product-table.component';
import { ProductCreatePageComponent } from './pages/product-create-page/product-create-page.component';
import { ProductLayoutComponent } from '../products/layout/product-layout-component/product-layout.component';
import { LayoutComponent } from '../layout/layout.component';
import { ProductUpdatePageComponent } from './pages/product-update-page/product-update-page.component';

export const ProductsRoutes: Routes = [
  {
    path: '',
    component: ProductLayoutComponent,
    children: [ // Redirigir a product-table por defecto
      { path: 'lists', component: ProductTableComponent },
      { path: 'create', component: ProductCreatePageComponent },
      { path: 'edit/:id', component: ProductUpdatePageComponent },
      { path: '', redirectTo: 'lists', pathMatch: 'full' },
    ],
  },
];
