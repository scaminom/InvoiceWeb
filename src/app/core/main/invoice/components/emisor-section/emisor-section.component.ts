import { Component, OnInit, input } from '@angular/core';
import { Establecimiento } from '../../interfaces/invoice.interface';

@Component({
  selector: 'app-emisor-section',
  standalone: true,
  imports: [],
  templateUrl: './emisor-section.component.html',
  styles: ``,
})
export class EmisorSectionComponent {
  emisor = input.required<Establecimiento>();
}
