import { Component, OnInit, inject } from '@angular/core';
import { EmisorSectionComponent } from '../../components/emisor-section/emisor-section.component';
import { ClientSectionComponent } from '../../components/client-section/client-section.component';
import { ItemSectionComponent } from '../../components/item-section/item-section.component';
import { Invoice } from '../../interfaces/invoice-bh.interface';
import { InvoiceService } from '../../invoice.service';
import { CalculateValuesComponent } from '../../components/calculate-values/calculate-values.component';
import { TotalResponseInterface } from '../../interfaces/total-response.interface';
import { Router } from '@angular/router';
import { ErrorMessage } from '../../../../../shared/interface/error-message.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-invoice-page',
  standalone: true,
  imports: [
    EmisorSectionComponent,
    ClientSectionComponent,
    ItemSectionComponent,
    CalculateValuesComponent,

  ],
  templateUrl: './create-invoice-page.component.html',
  styles: ``,
})
export class CreateInvoicePageComponent implements OnInit {
  invoice: Invoice | null = null;
  total!: TotalResponseInterface;

  private invoiceService = inject(InvoiceService);
  public router = inject(Router);

  ngOnInit(): void {
    this.invoiceService.getInvoice().subscribe((invoice) => {
      this.invoice = invoice;
    });
  }

  sendData(): void {
    if (this.invoice) {
      this.invoiceService.sendInvoice(this.invoice).subscribe({
        next: (response) => {
          this.router.navigate(['/dashboard/invoice']);
        },
        error: (infoError) => {
          const errores = infoError.error as ErrorMessage;
          const formattedDescription = errores.description.map(line =>`<p>${line}</p>`).join('');
          Swal.fire({
            title: errores.message,
            icon: 'error',
            html: formattedDescription,
          });
  
        }
      });
    }
  }

  onTotalChanged(newTotal: TotalResponseInterface): void {
    this.total = newTotal;
  }
}
