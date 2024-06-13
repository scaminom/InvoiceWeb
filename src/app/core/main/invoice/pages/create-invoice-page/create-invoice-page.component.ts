import { Component, OnInit, inject } from '@angular/core';
import { EmisorSectionComponent } from '../../components/emisor-section/emisor-section.component';
import { ClientSectionComponent } from '../../components/client-section/client-section.component';
import { ItemSectionComponent } from '../../components/item-section/item-section.component';
import { Invoice } from '../../interfaces/invoice-bh.interface';
import { InvoiceService } from '../../invoice.service';

@Component({
  selector: 'app-create-invoice-page',
  standalone: true,
  imports: [
    EmisorSectionComponent,
    ClientSectionComponent,
    ItemSectionComponent,
  ],
  templateUrl: './create-invoice-page.component.html',
  styles: ``,
})
export class CreateInvoicePageComponent implements OnInit {
  invoice: Invoice | null = null;

  private InvoiceService = inject(InvoiceService);

  ngOnInit(): void {
    this.InvoiceService.getInvoice().subscribe((invoice) => {
      this.invoice = invoice;
    });
  }

  sendData(): void {
    if (this.invoice) {
      console.log('Invoice data', this.invoice);
    }
  }
}
