import { Component, OnInit, inject } from '@angular/core';
import { EmisorSectionComponent } from '../../components/emisor-section/emisor-section.component';
import { ClientSectionComponent } from '../../components/client-section/client-section.component';

@Component({
  selector: 'app-create-invoice-page',
  standalone: true,
  imports: [EmisorSectionComponent, ClientSectionComponent],
  templateUrl: './create-invoice-page.component.html',
  styles: ``,
})
export class CreateInvoicePageComponent {}
