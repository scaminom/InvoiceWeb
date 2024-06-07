import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ReactiveValidationModule,
  Validators,
} from 'angular-reactive-validation';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, ReactiveValidationModule, MatFormFieldModule],
  templateUrl: './login-page.component.html',
  styles: ``,
  schemas: [],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.initForm();
  }

  login(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
          Swal.fire({
            title: 'Bienvenido',
            text: 'Inicio de sesión exitoso',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      });
    }
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required('El nombre de usuario es requerido')],
      ],
      password: ['', [Validators.required('La contraseña es requerida')]],
    });
  }
}
