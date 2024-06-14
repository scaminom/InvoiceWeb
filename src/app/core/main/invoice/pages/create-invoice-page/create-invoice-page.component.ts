import { Component } from '@angular/core';
import { EmisorSectionComponent } from '../../components/emisor-section/emisor-section.component';

@Component({
  selector: 'app-create-invoice-page',
  standalone: true,
  imports: [EmisorSectionComponent],
  templateUrl: './create-invoice-page.component.html',
  styles: ``,
})
export class CreateInvoicePageComponent {}
