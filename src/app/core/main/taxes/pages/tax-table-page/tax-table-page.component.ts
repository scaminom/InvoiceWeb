import { Component, OnInit, inject } from '@angular/core';
import { TaxTableComponent } from '../../components/tax-table/tax-table.component';
import { TaxesService } from '../../taxes.service';
import { ICodigoTarifa } from '../../interfaces/tax.interface';
import { needConfirmation } from '../../../../../shared/components/confirm-dialog/decorators/confirm-dialog.decorator';
import Swal from 'sweetalert2';

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
  deleteTax(id: number): void {
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
        this.taxesService.deleteTax(id).subscribe(() => {
          this.taxes = this.taxes.filter((tax) => tax.id !== id);
        });
      }
    });
  }
}
