import { Component, OnInit, inject } from '@angular/core';
import { IEstablismnets } from '../../interfaces/establishments.iterface';
import { EstablishmentsService } from '../../establishments.service';
import { needConfirmation } from '../../../../../shared/components/confirm-dialog/decorators/confirm-dialog.decorator';
import { EstablishmentsTableComponent } from '../../components/establishments-table-component/establishments-table-component.component';

@Component({
  selector: 'app-establishments-table-page',
  standalone: true,
  imports: [EstablishmentsTableComponent],
  templateUrl: './establishments-table-page.component.html',
  styles: ``,
})
export class EstablishmentsTablePageComponent implements OnInit {
  establishment : IEstablismnets[] = [];

  private establishmentervice = inject(EstablishmentsService);

  ngOnInit(): void {
    this.establishmentervice.getAllEstablishments().subscribe((establishment) => {
      this.establishment = establishment;
    });
  }

  @needConfirmation({
    title: 'Eliminar Establecimiento',
    message: '¿Estás seguro de eliminar este establecimiento?',
  })
  deleteEstablishments(id: string): void {
    
    this.establishmentervice.deleteEstablishment(id).subscribe(() => {
        this.establishment = this.establishment.filter((esta) => esta.id !== id);
      },
    );
  }
}
