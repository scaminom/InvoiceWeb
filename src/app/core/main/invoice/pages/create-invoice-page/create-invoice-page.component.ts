import { Component, OnInit, inject } from '@angular/core';
import { EmisorSectionComponent } from '../../components/emisor-section/emisor-section.component';
import { ClientSectionComponent } from '../../components/client-section/client-section.component';
import { ItemSectionComponent } from '../../components/item-section/item-section.component';
import { Invoice } from '../../interfaces/invoice-bh.interface';
import { InvoiceService } from '../../invoice.service';
import { CalculateValuesComponent } from '../../components/calculate-values/calculate-values.component';
import { TotalResponseInterface } from '../../interfaces/total-response.interface';

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

  ngOnInit(): void {
    this.invoiceService.getInvoice().subscribe((invoice) => {
      this.invoice = invoice;
    });
  }

  sendData(): void {
    if (this.invoice) {
      this.invoiceService.sendInvoice(this.invoice).subscribe({
        next: (response) => {
          console.log('Response', response);
        },
        error: (error) => {
          console.error('Error', error);
        },
      });
    }
  }

  onTotalChanged(newTotal: TotalResponseInterface): void {
    this.total = newTotal;
  }
}
