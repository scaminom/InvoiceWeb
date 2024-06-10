import { Component, OnInit, inject } from '@angular/core';
import { IEstablismnet} from '../../interfaces/establishment.iterface';
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
  establishments : IEstablismnet[] = [];

  private establishmentService = inject(EstablishmentsService);

  ngOnInit(): void {
    this.establishmentService.getAllEstablishments().subscribe((establishment) => {
      this.establishments = establishment;
    });
  }

  @needConfirmation({
    title: 'Eliminar Establecimiento',
    message: '¿Estás seguro de eliminar este establecimiento?',
  })
  deleteEstablishment(id: string): void {
    
    this.establishmentService.deleteEstablishment(id).subscribe(() => {
        this.establishments = this.establishments.filter((esta) => esta.id !== id);
      },
    );
  }
}
