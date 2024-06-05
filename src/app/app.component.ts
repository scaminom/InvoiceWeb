import { Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { AuthStatus } from './core/auth/enums/auth-status.enum';
import { LoadingComponent } from './shared/components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private authService = inject(AuthService);

  public finishedAuthCheck = computed<boolean>(() => {
    return this.authService.authStatus() !== AuthStatus.CHECKING;
  });
}
