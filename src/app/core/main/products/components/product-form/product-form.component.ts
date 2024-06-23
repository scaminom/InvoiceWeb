import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../interfaces/product-interface';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { ProductsService } from '../../products.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import {
  ReactiveValidationModule,
  Validators,
} from 'angular-reactive-validation';
import { ICodigoTarifa } from '../../../taxes/interfaces/tax.interface';
import { TaxesService } from '../../../taxes/taxes.service';
import { ErrorMessage } from '../../../../../shared/interface/error-message.interface';

@Component({
  selector: 'app-product-form',
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
  templateUrl: './product-form.component.html',
  styles: ``,
})
export class ProductFormComponent implements OnInit {
  taxCodes: ICodigoTarifa[] = [];
  private activeRoute = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  private taxeService = inject(TaxesService);
  public router = inject(Router);
  private formBuilder = inject(FormBuilder);

  productForm!: FormGroup;
  isEditMode: boolean = false;
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.taxeService.getAllTaxesCodes().subscribe({
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
      nombre: ['', Validators.required('El nombre del producto es requerido')],
      descripcion: [
        '',
        Validators.required('La descripcion del producto es requerido'),
      ],
      existencia: ['', [Validators.required('La existencia es requerido'), Validators.pattern(/^\d+$/, 'Este campo debe contener solo números')]],
      precioUnitario: [
        '',
        [Validators.required('El precio unitario es requerido'),Validators.pattern(/^[-+]?\d*\.?\d*$/, 'Este campo debe contener solo números')]
      ],
      codigoTarifa: ['', Validators.required('La tarifa de IVA es requerida')],
    });
  }

  private retrieveProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        const productData = {
          ...product,
          codigoTarifa: product.codigoTarifa.id,
        };
        this.productForm.patchValue(productData);
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

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit(): void {
   if (this.productForm.invalid) return;
    const formData = new FormData();
    const product = this.productForm.value;

    formData.append('codigoPrincipal', product.codigoPrincipal);
    formData.append('nombre', product.nombre);
    formData.append('descripcion', product.descripcion);
    formData.append('existencia', product.existencia.toString());
    formData.append('precioUnitario', product.precioUnitario.toString());
    formData.append('codigoTarifa', product.codigoTarifa);
    if (this.selectedFile) {
      formData.append('imagen', this.selectedFile);
    }

    if (this.isEditMode) {
      const id = this.activeRoute.snapshot.params['id'];
      this.productService.updateProduct(id, formData).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/products']);
          Swal.fire({
            title: 'Producto actualizado',
            text: 'Producto actualizado correctamente',
            icon: 'success',
          });
        },
        error: (infoError) => {
          console.log(infoError);
          const errores = infoError.error as ErrorMessage;
          const formattedDescription = errores.description
            .map((line) => `<p>${line}</p>`)
            .join('');
          Swal.fire({
            title: errores.message,
            icon: 'error',
            html: formattedDescription,
          });
        },
      });
    } else {
      console.log(formData);
      this.productService.createProduct(formData).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/products']);
          Swal.fire({
            title: 'Producto creado',
            text: 'Producto creado correctamente',
            icon: 'success',
          });
        },
        error: (infoError) => {
          const errores = infoError.error as ErrorMessage;
          const formattedDescription = errores.description
            .map((line) => `<p>${line}</p>`)
            .join('');
          Swal.fire({
            title: errores.message,
            icon: 'error',
            html: formattedDescription,
          });
        },
      });
    }
  }
}
