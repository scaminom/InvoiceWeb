
import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { IEstablismnet} from '../../interfaces/establishment.iterface';

@Component({
  selector: 'app-establishment-table',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './establishments-table-component.component.html',
  styles: ``,
})
export class EstablishmentsTableComponent {
  establishments = input.required<IEstablismnet[]>();
  sendEstablishmentId = output<string>();

  onDeleteEstablishment(id: string): void {
    this.sendEstablishmentId.emit(id.toString());
  }
}
