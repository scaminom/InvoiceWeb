import { Component, OnInit, inject } from '@angular/core';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { IUser } from '../../../../auth/interfaces/user-interface';
import { UsersService } from '../../users.service';
import { RouterLink } from '@angular/router';
import { needConfirmation } from '../../../../../shared/components/confirm-dialog/decorators/confirm-dialog.decorator';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: "¿Estás seguro de eliminar esto?",
      text: "Los cambios serán irreversibles",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, elimínalo"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(() => {
          this.users = this.users.filter((user) => user.id !== id);
        });
      }
    });
    
  }
}
