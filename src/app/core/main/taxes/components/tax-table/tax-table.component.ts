
import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ICodigoTarifa } from '../../interfaces/tax.interface';

@Component({
  selector: 'app-tax-table',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './tax-table.component.html',
  styles: ``,
})
export class TaxTableComponent {
  taxes = input.required<ICodigoTarifa[]>();
  sendTaxId = output<number>();

  onDeleteTax(id: number): void {
    this.sendTaxId.emit(id);
  }
}

