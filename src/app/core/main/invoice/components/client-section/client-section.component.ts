import { Component, OnInit, inject } from '@angular/core';
import { IClient } from '../../../clients/interfaces/client-interface';
import { ClientsService } from '../../../clients/clients.service';

@Component({
  selector: 'app-client-section',
  standalone: true,
  imports: [],
  templateUrl: './client-section.component.html',
  styles: ``,
})
export class ClientSectionComponent implements OnInit {
  clients!: IClient[];
  private clientService = inject(ClientsService);

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }
}
