import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError, map } from 'rxjs';

export const authResolver: ResolveFn<boolean> = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/auth/login']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['/auth/login']);
      return [false];
    })
  );
};
