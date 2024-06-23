import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ReactiveValidationModule, Validators } from 'angular-reactive-validation';
import { EstablishmentsService } from '../../establishments.service'
import { ErrorMessage } from '../../../../../shared/interface/error-message.interface';

@Component({
  selector: 'app-establishment-form-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveValidationModule,
    CommonModule,

  ],
  templateUrl: './establishments-form-component.component.html',
  styles: ``,
})
export class EstablishmentFormComponent implements OnInit{
  private activeRoute = inject(ActivatedRoute);
  private establishmentsService = inject(EstablishmentsService);
  public router = inject(Router);
  private formBuilder = inject(FormBuilder);

  establishmentForm!: FormGroup;
  isEditMode: boolean = false;

  
    ngOnInit(): void {
      this.isEditMode = this.router.url.includes('edit');
      this.initForm();
  
      if (this.isEditMode) {
        this.activeRoute.params.subscribe((params) => {
          const id = params['id'];
          this.retrieveEstablishment(id);
        });
      }

    }

    initForm(): void {
      this.establishmentForm = this.formBuilder.group({
        ruc: ['', Validators.required('El RUC del establecimiento es requerido')],
        estab: ['', [Validators.required('El número del establecimiento es requerido'),Validators.minLength(3,'Mínimo 3 caracteres'), Validators.maxLength(3, 'Máximo 3 caracteres')]],
        razonSocial: ['', Validators.required('La razón social es requerida')],
        ptoEmi: ['', [Validators.required('El punto de emisión es requerido'),Validators.minLength(3,'Mínimo 3 caracteres'), Validators.maxLength(3, 'Máximo 3 caracteres')]],
        ambiente: ['', Validators.required('El ambiente es requerido')],
        obligadoContabilidad: ['', Validators.required('Obligado a contabilidad es un campo requerido')],
        dirEstablecimiento: ['', Validators.required('La dirección del establecimiento es requerida')],
        dirMatriz: ['', Validators.required('La dirección matriz es requerida')],
      });
    }
  

    retrieveEstablishment(id: number): void {
      this.establishmentsService.getEstablishmentById(id).subscribe((response) => {
        this.establishmentForm.patchValue(response);
      });
    }

    saveEstablishment(): void {
      if (this.establishmentForm.invalid) {
        Swal.fire('Error', 'Por favor complete el formulario', 'error');
        return;
      }
  
      if (this.isEditMode) {
        this.updateEstablishment();
      } else {
        this.createEstablishment();
      }
    }

    createEstablishment(): void {
      this.establishmentsService.createEstablishment(this.establishmentForm.value).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Establecimiento creado correctamente', 'success');
          this.router.navigate(['/dashboard/establishments/lists']);
        },
        error: (infoError) => {
          console.log(infoError)
          const errores = infoError.error as ErrorMessage;
          const formattedDescription = errores.description.map(line =>`<p>${line}</p>`).join('');
          Swal.fire({
            title: errores.message,
            icon: 'error',
            html: formattedDescription,
          });
  
        }
      });
    }

    updateEstablishment(): void {
      const id = this.activeRoute.snapshot.params['id'];
      const establishment = this.establishmentForm.value;
  
      this.establishmentsService.updateEstablishment(id, establishment).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Establecimiento actualizado correctamente', 'success');
          this.router.navigate(['/dashboard/establishments/lists']);
        },
        error: (infoError) => {
          console.log(infoError)
          const errores = infoError.error as ErrorMessage;
          const formattedDescription = errores.description.map(line =>`<p>${line}</p>`).join('');
          Swal.fire({
            title: errores.message,
            icon: 'error',
            html: formattedDescription,
          });
  
        }
      });
    }

    

}
