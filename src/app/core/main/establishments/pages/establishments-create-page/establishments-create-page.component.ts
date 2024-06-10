import { Component } from '@angular/core';
import { EstablishmentFormComponent } from "../../components/establishments-form-component/establishments-form-component.component";

@Component({
    selector: 'app-establishment-create-page',
    standalone: true,
    templateUrl: './establishments-create-page.component.html',
    styles: ``,
    imports: [EstablishmentFormComponent]
})
export class EstablishmentCreatePageComponent {}

