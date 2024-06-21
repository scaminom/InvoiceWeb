import { Component, OnInit, inject } from '@angular/core';
import { EstablishmentsService } from '../../../establishments/establishments.service';
import { InvoiceService } from '../../invoice.service';
import { EstablishmentResponseInterface } from '../../interfaces/invoice.interface';

@Component({
  selector: 'app-emisor-section',
  standalone: true,
  imports: [],
  templateUrl: './emisor-section.component.html',
  styles: ``,
})
export class EmisorSectionComponent implements OnInit {
  private establishmentService = inject(EstablishmentsService);
  private invoiceService = inject(InvoiceService);
  establishments: EstablishmentResponseInterface[] = [];
  selectedEstablishmentId: number | null = null;

  ngOnInit(): void {
    this.establishmentService
      .getAllEstablishments()
      .subscribe((establishments) => {
        this.establishments = establishments;
        this.updateEstablishmentBaseCase();
      });
  }

  onEstablishmentChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedEstablishmentId = +target.value;
    this.invoiceService.updateEstablecimiento(selectedEstablishmentId);
  }

  private updateEstablishmentBaseCase(): void {
    if (this.establishments.length === 1) {
      this.selectedEstablishmentId = this.establishments[0].id;
      this.invoiceService.updateEstablecimiento(this.selectedEstablishmentId);
    }
  }
}
