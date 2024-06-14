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
  private subscription!: Subscription;

  searchInput = new FormControl<string>('');
  establishments!: Establecimiento[];
  filteredEstablishments?: Observable<Establecimiento[]>;
  selectedEstablishment?: Establecimiento;

  ngOnInit(): void {
    this.subscription = this.establishmentService
      .getAllEstablishments()
      .subscribe((establishments) => {
        this.establishments = establishments;
        this.setupFilter();
      });
  }

  setupFilter(): void {
    this.filteredEstablishments = this.searchInput.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterEstablishments(value || ''))
    );
  }

  private filterEstablishments(query: string): Establecimiento[] {
    return this.establishments.filter((establishment) =>
      establishment.ruc.includes(query)
    );
  }

  displayEstablishment(establishment: Establecimiento): string {
    return establishment.ruc
      ? establishment.ruc + ' - ' + establishment.razonSocial
      : '';
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
