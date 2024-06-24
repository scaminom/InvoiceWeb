import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { IUser } from '../../../core/auth/interfaces/user-interface';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './side-bar.component.html',
  styles: ``,
})
export class SideBarComponent {
  private authServce = inject(AuthService);

  public getUser(): IUser | null {
    return this.authServce?.currentUser;
  }
}
