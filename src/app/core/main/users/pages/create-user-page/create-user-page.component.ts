import { Component } from '@angular/core';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-create-user-page',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './create-user-page.component.html',
  styles: ``,
})
export class CreateUserPageComponent {}
