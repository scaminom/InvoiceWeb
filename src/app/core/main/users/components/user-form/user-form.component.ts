import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../users.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import {
  ReactiveValidationModule,
  Validators,
} from 'angular-reactive-validation';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import Swal from 'sweetalert2';
import { ErrorMessage } from '../../../../../shared/interface/error-message.interface';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveValidationModule,
  ],
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
      firstName: ['', [Validators.required('El nombre es requerido'),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre debe contener solo letras')]],
      lastName: ['', [Validators.required('El apellido es requerido'),Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido debe contener solo letras')]],
      username: ['', [Validators.required('El username es requerido')]],
      email: [
        '',
        [
          Validators.required('El email es requerido'),
          Validators.email('El email no es valido'),
        ],
      ],
      password: [
        '',
        [
          Validators.required('La contraseña es requerida'),
          Validators.minLength(
            6,
            'La contraseña debe tener al menos 6 caracteres'
          ),
        ],
      ],
      role: ['', [Validators.required('El rol es requerido')]],
    });
  }

  private retrieveUser(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener el usuario',
          icon: 'error',
        });
        this.router.navigate(['/dashboard/users']);
      },
    });
  }

  onUpdate(): void {
    const id = this.activeRoute.snapshot.params['id'];
    const user = this.userForm.value;

    this.userService.updateUser(id, user).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/users']);
        Swal.fire({
          title: 'Usuario actualizado',
          text: 'El usuario ha sido actualizado correctamente',
          icon: 'success',
        });
      },
      error: (infoError) => {
        console.log(infoError)
        const errores = infoError.error as ErrorMessage;
        const formattedDescription = errores.description.map(line =>`<p>${line}</p>`).join('');
        Swal.fire({
          title: errores.message,
          icon: 'error',
          html: formattedDescription,
        });

      }
    });
  }

  onCreate(): void {
    if (this.userForm.invalid) return;

    const user = this.userForm.value;

    this.userService.createUser(user).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/users']);
        Swal.fire({
          title: 'Usuario creado',
          text: 'El usuario ha sido creado correctamente',
          icon: 'success',
        });
      },
      error: (infoError) => {
        console.log(infoError)
        const errores = infoError.error as ErrorMessage;
        const formattedDescription = errores.description.map(line =>`<p>${line}</p>`).join('');
        Swal.fire({
          title: errores.message,
          icon: 'error',
          html: formattedDescription,
        });

      }
    });
  }
}
