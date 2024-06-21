import { Component, OnInit, inject } from '@angular/core';
import { ClientTableComponent } from '../../components/client-table/client-table.component';
import { IClient } from '../../interfaces/client-interface';
import { ClientsService } from '../../clients.service';
import { needConfirmation } from '../../../../../shared/components/confirm-dialog/decorators/confirm-dialog.decorator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-table-page',
  standalone: true,
  imports: [ClientTableComponent],
  templateUrl: './client-table-page.component.html',
  styles: ``,
})
export class ClientTablePageComponent implements OnInit {
  clients: IClient[] = [];

  private clientService = inject(ClientsService);

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  deleteClient(id: number): void {
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
        this.clientService.deleteClient(id).subscribe(() => {
          this.clients = this.clients.filter((client) => client.id !== id);
        });
      }
    });
  }
  
}
