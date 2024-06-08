import { Component, OnInit, inject } from '@angular/core';
import { ClientTableComponent } from '../../components/client-table/client-table.component'; 
import { IClient } from '../../interfaces/client-interface';
import { ClientsService } from '../../clients.service'; 
import { RouterLink } from '@angular/router';

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

  @needConfirmation({
    title: 'Eliminar Cliente',
    message: '¿Estás seguro de eliminar este cliente?',
  })
  deleteClient(id: number): void {
    this.clientService.deleteClient(id).subscribe(() => {
      this.clients = this.clients.filter((client) => client.id !== id);
    });
  }
}