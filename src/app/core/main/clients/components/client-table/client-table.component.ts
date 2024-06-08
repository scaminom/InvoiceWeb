import { Component, inject, input, output } from '@angular/core';
import { IClient } from '../../interfaces/client-interface'; 
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './client-table.component.html',
  styles: ``,
})
export class ClientTableComponent {
  clients = input.required<IClient[]>();
  sendClientId = output<number>();

  onDeleteClient(id: number): void {
    this.sendClientId.emit(id);
  }
}
