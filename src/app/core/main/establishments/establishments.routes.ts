import { Routes } from "@angular/router";
import { LayoutComponent } from "../layout/layout.component";
import { EstablishmentsLayoutComponent } from "./layout/establishments-layout-component/establishments-layout-component.component";
import { EstablishmentsTablePageComponent } from "./pages/establishments-table-page/establishments-table-page.component";
import { EstablishmentsCreatePageComponent } from "./pages/establishments-create-page/establishments-create-page.component";
import { EstablishmentsUpdatePageComponent } from "./pages/establishments-update-page/establishments-update-page.component";



export const EstablishmentsRoutes: Routes = [ 
    {
        path: '',
        component: EstablishmentsLayoutComponent,
        children: [
        { path: 'lists', component: EstablishmentsTablePageComponent },
        { path: 'create', component: EstablishmentsCreatePageComponent},
        { path: 'edit/:id', component: EstablishmentsUpdatePageComponent },
        { path: '', redirectTo: 'lists', pathMatch: 'full' },
        ],
    },
    ];