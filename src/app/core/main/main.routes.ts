import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { InvoiceComponent } from "./invoice/invoice.component";

export const MainRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'invoice', component: InvoiceComponent
      }
    ]
  }
]