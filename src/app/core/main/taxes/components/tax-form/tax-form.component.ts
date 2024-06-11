import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ReactiveValidationModule,
  Validators,
} from 'angular-reactive-validation';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import Swal from 'sweetalert2';
import { TaxesService } from '../../taxes.service';

@Component({
  selector: 'app-tax-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveValidationModule,
  ],
  templateUrl: './tax-form.component.html',
  styles: ``,
})
export class TaxFormComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute);
  private taxService = inject(TaxesService);
  public router = inject(Router);
  private formBuilder = inject(FormBuilder);

  taxForm!: FormGroup;
  isEditMode: boolean = false;

  ngOnInit(): void {
    this.isEditMode = this.router.url.includes('edit');
    this.initForm();

    if (this.isEditMode) {
      this.activeRoute.params.subscribe((params) => {
        const id = params['id'];
        this.retrievetax(id);
      });
    }
  }

  initForm(): void {
    this.taxForm = this.formBuilder.group({
      codigo: ['', [Validators.required('El código es requerido')]],
      descripcion: ['', [Validators.required('La descripción es requerido')]],
      porcentaje: ['', [Validators.required('El porcentaje es requerido')]],
    });
  }

  private retrievetax(id: number): void {
    this.taxService.getTaxById(id).subscribe({
      next: (tax) => {
        this.taxForm.patchValue(tax);
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener la tarifa',
          icon: 'error',
        });
        this.router.navigate(['/dashboard/taxes']);
      },
    });
  }

  onUpdate(): void {
    const id = this.activeRoute.snapshot.params['id'];
    const tax = this.taxForm.value;

    this.taxService.updateTax(id, tax).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/taxes']);
        Swal.fire({
          title: 'Tarifa actualizada',
          text: 'La tarifa ha sido actualizada correctamente',
          icon: 'success',
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          html: error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }

  onCreate(): void {
    if (this.taxForm.invalid) return;

    const tax = this.taxForm.value;

    this.taxService.createTax(tax).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/taxes']);
        Swal.fire({
          title: 'Tarifa creada',
          text: 'La tarifa ha sido creado correctamente',
          icon: 'success',
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          html: error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }
}