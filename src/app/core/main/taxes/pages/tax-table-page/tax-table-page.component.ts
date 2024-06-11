import { Component, OnInit, inject } from '@angular/core';
import { TaxTableComponent } from '../../components/tax-table/tax-table.component';
import { TaxesService } from '../../taxes.service';
import { ICodigoTarifa } from '../../interfaces/tax.interface';
import { needConfirmation } from '../../../../../shared/components/confirm-dialog/decorators/confirm-dialog.decorator';

@Component({
  selector: 'app-tax-table-page',
  standalone: true,
  imports: [TaxTableComponent],
  templateUrl: './tax-table-page.component.html',
  styles: ``,
})
export class TaxTablePageComponent implements OnInit{

  taxes : ICodigoTarifa[] = [];
  taxesService = inject(TaxesService);

  ngOnInit(): void {
    this.taxesService.getAllTaxesCodes().subscribe((taxes) => {
      this.taxes = taxes
    })
    
  }

  @needConfirmation({
    title: 'Eliminar Tarifa',
    message: '¿Estás seguro de eliminar esta tarifa?',
  })
  deleteTax(id: number): void {
    this.taxesService.deleteTax(id).subscribe(() => {
      this.taxes = this.taxes.filter((tax) => tax.id !== id);
    });
  }



}
