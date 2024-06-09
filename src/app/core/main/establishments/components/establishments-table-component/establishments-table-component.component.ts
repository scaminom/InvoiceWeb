
import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { IEstablismnets } from '../../interfaces/establishments.iterface';

@Component({
  selector: 'app-establishment-table',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './establishments-table-component.component.html',
  styles: ``,
})
export class EstablishmentsTableComponent {
  establishments = input.required<IEstablismnets[]>();
  sendEstablishmentid = output<string>();

  onDeleteEstablishment(id: string): void {
    this.sendEstablishmentid.emit(id.toString());
  }
}
