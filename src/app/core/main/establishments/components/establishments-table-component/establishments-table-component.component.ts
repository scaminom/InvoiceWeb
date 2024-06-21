import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { IEstablishment } from '../../interfaces/establishment.iterface';

@Component({
  selector: 'app-establishment-table',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './establishments-table-component.component.html',
  styles: ``,
})
export class EstablishmentTableComponent {
  establishments = input.required<IEstablishment[]>();
  sendEstablishmentId = output<number>();

  onDeleteEstablishment(id: number): void {
    this.sendEstablishmentId.emit(id);
  }
}
