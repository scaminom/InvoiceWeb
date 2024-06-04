import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from 'angular-reactive-validation';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styles: ``,
  schemas: [],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  constructor() {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required('El username es requerido')]],
      password: ['', [Validators.required('La contraseña es requerida')]],
    });
  }
  login(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: () => {
          console.log('Usuario no autenticado');
        },
      });
    }
  }
}
