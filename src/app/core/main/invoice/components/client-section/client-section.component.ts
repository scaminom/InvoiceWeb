import { Component, OnInit, inject } from '@angular/core';
import { IClient } from '../../../clients/interfaces/client-interface';
import { ClientsService } from '../../../clients/clients.service';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { ClientFormComponent } from '../../../clients/components/client-form/client-form.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-client-section',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    ClientFormComponent,
    MatDialogModule,
  ],
  templateUrl: './client-section.component.html',
  styles: ``,
})
export class ClientSectionComponent implements OnInit {
  clients!: IClient[];
  private clientService = inject(ClientsService);
  filteredClients?: Observable<IClient[]>;
  searchInput = new FormControl<string>('');

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    });

    this.filteredClients = this.searchInput.valueChanges.pipe(
      debounceTime(200),
      startWith(''),
      map((value) => this.filter(value || ''))
    );
  }

  displayClient(client: IClient): string {
    return client.identificacionComprador
      ? client.identificacionComprador + ' - ' + client.razonSocialComprador
      : '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      width: '800px',
    });

    dialogRef.componentInstance.formSubmitted.subscribe(
      (newClient: IClient) => {
        this.clients.push(newClient);
        // this.displayClient(newClient); TO DO
        dialogRef.close();
      }
    );
  }

  private filter(value: string): IClient[] {
    return this.clients?.filter((client) =>
      client.identificacionComprador.includes(value)
    );
  }
}
