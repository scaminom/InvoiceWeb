import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../users.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidatorDeclaration, Validators } from 'angular-reactive-validation';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styles: ``,
})
export class UserFormComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute);
  private userService = inject(UsersService);
  public router = inject(Router);
  private formBuilder = inject(FormBuilder);

  userForm!: FormGroup;
  isEditMode: boolean = false;

  ngOnInit(): void {
    this.isEditMode = this.router.url.includes('edit');
    this.initForm();

    if (this.isEditMode) {
      this.activeRoute.params.subscribe((params) => {
        const id = params['id'];
        this.retrieveUser(id);
      });
    }
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required('El nombre es requerido')]],
      lastName: ['', [Validators.required('El apellido es requerido')]],
      username: ['', [Validators.required('El username es requerido')]],
      email: [
        '',
        [
          Validators.required('El email es requerido'),
          Validators.email('El email no es valido'),
        ],
      ],
      password: ['', [Validators.required('La contraseña es requerida')]],
      role: [
        'USER',
        [
          Validators.required('El rol es requerido'),
          this.roleValidator('El rol no es valido'),
        ],
      ],
    });
  }

  roleValidator = ValidatorDeclaration.wrapNoArgumentValidator((control) => {
    return ['ADMIN', 'USER'].includes(control.value)
      ? null
      : { invalidRole: true };
  }, 'role');

  private retrieveUser(id: number): void {
    this.userService.getUserById(id).subscribe((user) => {
      this.userForm.patchValue(user);
    });
  }
}
