import { Component, OnInit, inject, input } from '@angular/core';
import { Establecimiento } from '../../interfaces/invoice.interface';
import { EstablishmentsService } from '../../../establishments/establishments.service';
import { FilterPipe } from '../../pipes/filter.pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';

@Component({
  selector: 'app-emisor-section',
  standalone: true,
  imports: [FilterPipe, AsyncPipe, ReactiveFormsModule, MatAutocompleteModule],
  templateUrl: './emisor-section.component.html',
  styles: ``,
})
export class EmisorSectionComponent implements OnInit {
  private establishmentService = inject(EstablishmentsService);
  establishments!: Establecimiento[];

  ngOnInit(): void {
    this.establishmentService
      .getAllEstablishments()
      .subscribe((establishments) => {
        this.establishments = establishments;
      });
  }
}
