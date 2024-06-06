import { Component } from '@angular/core';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-edit-user-page',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './edit-user-page.component.html',
  styles: ``,
})
export class EditUserPageComponent {}
