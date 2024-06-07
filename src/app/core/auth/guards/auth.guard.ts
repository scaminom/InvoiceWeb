import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';
import { Observable, catchError, debounceTime, map, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthStatus } from '../enums/auth-status.enum';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/auth/login']);
        Swal.fire({
          title: 'Sesión inválida',
          text: 'Inicia sesión para continuar',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        });
        return false;
      }
    }),
    catchError(() => {
      console.log('Error al validar la sesión');
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
