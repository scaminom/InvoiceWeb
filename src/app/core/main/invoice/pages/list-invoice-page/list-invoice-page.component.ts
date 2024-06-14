import { Component, OnInit, inject } from '@angular/core';
import { InvoiceTableComponent } from '../../components/invoice-table/invoice-table.component';
import { Invoice } from '../../interfaces/invoice.interface';
import { InvoiceService } from '../../invoice.service';

@Component({
  selector: 'app-list-invoice-page',
  standalone: true,
  imports: [InvoiceTableComponent],
  templateUrl: './list-invoice-page.component.html',
  styles: ``
})
export class ListInvoicePageComponent implements OnInit {

  invoices: Invoice[] = []

  private invoiceService = inject(InvoiceService);

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe((invoices) => {
      this.invoices = invoices;
    })
  }
}
