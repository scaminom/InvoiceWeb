import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BrowserStorageService } from '../services/browser-storage.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = inject(BrowserStorageService);
  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
