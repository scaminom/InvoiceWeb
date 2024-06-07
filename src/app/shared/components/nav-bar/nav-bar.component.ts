import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { IUser } from '../../../core/auth/interfaces/user-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './nav-bar.component.html',
  styles: ``,
})
export class NavBarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  get userLogged(): IUser | null {
    return this.authService.currentUser;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
        Swal.fire({
          title: 'Sesión cerrada',
          text: 'Hasta luego',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al cerrar la sesión',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }
}
