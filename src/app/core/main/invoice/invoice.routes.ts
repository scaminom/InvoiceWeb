import { Routes } from '@angular/router';
import { InvoiceLayoutComponent } from './layout/invoice-layout/invoice-layout.component';
import { CreateInvoicePageComponent } from './pages/create-invoice-page/create-invoice-page.component';
import { ListInvoicePageComponent } from './pages/list-invoice-page/list-invoice-page.component';
import { InvoiceTableTestPageComponent } from './pages/invoice-table-test-page/invoice-table-test-page.component';

export const InoviceRoutes: Routes = [
  {
    path: '',
    component: InvoiceLayoutComponent,
    children: [
      { path: 'new-invoice', component: CreateInvoicePageComponent },
      { path: 'list', component: ListInvoicePageComponent },
      { path: 'test', component: InvoiceTableTestPageComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];
