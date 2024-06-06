import { Component } from "@angular/core";
import { ClientFormComponent } from "../../components/client-form/client-form.component";

@Component({
    selector: 'app-create-client-page',
    standalone: true,
    imports:[ClientFormComponent],
    templateUrl: './create-client-page.component.html',
    styles: ``,
})
export class CreateClientPageComponente{}