import {
  ApplicationConfig,
  ENVIRONMENT_INITIALIZER,
  importProvidersFrom,
  inject,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authTokenInterceptor } from './shared/interceptors/auth-token-interceptor.interceptor';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogService } from './shared/components/confirm-dialog/confirm-dialog.service';

export function initializeDialogService() {
  return () => {
    inject(ConfirmDialogService);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([authTokenInterceptor])),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    importProvidersFrom(MatDialogModule),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useFactory: initializeDialogService,
      deps: [MatDialog],
      multi: true,
    },
  ],
};
