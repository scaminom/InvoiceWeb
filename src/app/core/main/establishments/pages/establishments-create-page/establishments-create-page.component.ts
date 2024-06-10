import { Component } from '@angular/core';
import { EstablishmentsFormComponent } from "../../components/establishments-form-component/establishments-form-component.component";

@Component({
    selector: 'app-establishments-create-page',
    standalone: true,
    templateUrl: './establishments-create-page.component.html',
    styles: ``,
    imports: [EstablishmentsFormComponent]
})
export class EstablishmentCreatePageComponent {}

