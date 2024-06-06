import { Component, inject, input, output } from '@angular/core';
import { IUser } from '../../../../auth/interfaces/user-interface';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-table.component.html',
  styles: ``,
})
export class UserTableComponent {
  users = input.required<IUser[]>();
  sendUserId = output<number>();

  onDeleteUser(id: number): void {
    this.sendUserId.emit(id);
  }
}
