import { Component } from '@angular/core';
import { ClientFormComponent } from '../../components/client-form/client-form.component'; 
@Component({
  selector: 'app-edit-client-page',
  standalone: true,
  imports: [ClientFormComponent],
  templateUrl: './edit-client-page.component.html',
  styles: ``,
})
export class EditClientPageComponent {}
