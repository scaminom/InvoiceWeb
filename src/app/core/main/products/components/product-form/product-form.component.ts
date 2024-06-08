import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICodigoTarifa } from '../../interfaces/product-interface';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { ProductsService } from '../../products.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {
  ReactiveValidationModule,
  Validators,
} from 'angular-reactive-validation';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveValidationModule,],
  templateUrl: './product-form.component.html',
  styles: ``,
})
export class ProductFormComponent implements OnInit{
  taxCodes: ICodigoTarifa[] = [];
  private activeRoute = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  public router = inject(Router);
  private formBuilder = inject(FormBuilder);

  productForm!: FormGroup;
  isEditMode: boolean = false;

  ngOnInit(): void {
    this.productService.getAllTaxsCodes().subscribe({
      next: (taxCodes) => {
        this.taxCodes = taxCodes;
      },
    });
    this.isEditMode = this.router.url.includes('edit');
    this.initForm();

    if (this.isEditMode) {
      this.activeRoute.params.subscribe((params) => {
        const id = params['id'];
        this.retrieveProduct(id);
      });
    }
  }

  initForm(): void {
    this.productForm = this.formBuilder.group({
      codigoPrincipal: [
        '',
        Validators.required('El codigo del producto es requerido'),
      ],
      nombre: [
        '',
        Validators.required('El nombre del producto es requerido'),
      ],
      descripcion: [
        '',
        Validators.required('La descripcion del producto es requerido'),
      ],
      urlImage: [
        '',
        Validators.required('La url de la imagen es requerido'),
      ],
      existencia: [
        '',
        Validators.required('La existencia es requerido'),
      ],
      precioUnitario: [
        '',
        Validators.required('El precio unitario es requerido'),
      ],
      codigoTarifa: [
        '',
        Validators.required('La tarifa de IVA es requerida'),
      ],
    });
  }

  private retrieveProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se puede obtener el producto',
          icon: 'error',
        });
        this.router.navigate(['/dashboard/products']);
      },
    });
  }

  onUpdate(): void {
    const id = this.activeRoute.snapshot.params['id'];
    const product = this.productForm.value;

    this.productService.updateProduct(id, product).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/products']);
        Swal.fire({
          title: 'Producto actualizado',
          text: 'Producto actualizado correctamente',
          icon: 'success',
        });
      },
    });
  }

  onCreate(): void {
    if (this.productForm.invalid) return;
    const product = this.productForm.value;

    this.productService.createProduct(product).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/products']);
        Swal.fire({
          title: 'Producto creado',
          text: 'Producto creado correctamente',
          icon: 'success',
        });
      },
    });
  }
}