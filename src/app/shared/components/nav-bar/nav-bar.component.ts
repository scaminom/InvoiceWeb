import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { IUser } from '../../../core/auth/interfaces/user-interface';

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

  get userLogged() {
    console.log(this.authService.user());
    return this.authService.user();
  }

  logout() {
    // this.authService.logout();
    // this.router.navigate(['/login']);
  }
}
