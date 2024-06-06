import { Component, OnInit, inject } from '@angular/core';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { IUser } from '../../../../auth/interfaces/user-interface';
import { UsersService } from '../../users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-table-page',
  standalone: true,
  imports: [UserTableComponent],
  templateUrl: './user-table-page.component.html',
  styles: ``,
})
export class UserTablePageComponent implements OnInit {
  users: IUser[] = [];

  private userService = inject(UsersService);

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== id);
    });
  }
}