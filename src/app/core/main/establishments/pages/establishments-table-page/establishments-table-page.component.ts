import { Component, OnInit, inject } from '@angular/core';
import { IEstablishment } from '../../interfaces/establishment.iterface';
import { EstablishmentsService } from '../../establishments.service';
import { needConfirmation } from '../../../../../shared/components/confirm-dialog/decorators/confirm-dialog.decorator';
import { EstablishmentTableComponent } from '../../components/establishments-table-component/establishments-table-component.component';

@Component({
  selector: 'app-establishment-table-page',
  standalone: true,
  imports: [EstablishmentTableComponent],
  templateUrl: './establishments-table-page.component.html',
  styles: ``,
})
export class EstablishmentTablePageComponent implements OnInit {
  establishments: IEstablishment[] = [];

  private establishmentService = inject(EstablishmentsService);

  ngOnInit(): void {
    this.establishmentService
      .getAllEstablishments()
      .subscribe((establishment) => {
        this.establishments = establishment;
      });
  }

  @needConfirmation({
    title: 'Eliminar Establecimiento',
    message: '¿Estás seguro de eliminar este establecimiento?',
  })
  deleteEstablishment(id: number): void {
    this.establishmentService.deleteEstablishment(id).subscribe(() => {
      this.establishments = this.establishments.filter(
        (esta) => esta.id !== id
      );
    });
  }
}
