import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

export const authResolver: ResolveFn<boolean> = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/auth/login']);
        Swal.fire({
          title: 'Sesión inválida',
          text: 'Inicia sesión para continuar',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        });
      }
      return isAuthenticated;
    }),
    catchError((error) => {
      console.error('Authentication check failed:', error);
      router.navigate(['/auth/login']);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al validar la sesión',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return of(false);
    })
  );
};
