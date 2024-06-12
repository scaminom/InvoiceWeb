import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ICodigoTarifa,
  IProduct,
} from '../../../products/interfaces/product-interface';
import { Observable, map, of, startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-dropdown',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    AsyncPipe,
  ],
  templateUrl: './product-dropdown.component.html',
  styles: ``,
})
export class ProductDropdownComponent {
  @Output() productSelected = new EventEmitter<IProduct>();
  productControl = new FormControl('');
  private codigoTarifa1: ICodigoTarifa = {
    id: 1,
    codigo: '0',
    descripcion: '0%',
    porcentaje: 0,
    activo: true,
  };
  products: IProduct[] = [
    {
      id: 1,
      codigoPrincipal: 'P001',
      descripcion: 'Product 1',
      precioUnitario: 100,
      urlImage: 'https://via.placeholder.com/150',
      nombre: 'Product 1',
      existencia: 10,
      activo: true,
      codigoTarifa: this.codigoTarifa1,
    },
    {
      id: 2,
      codigoPrincipal: 'P002',
      descripcion: 'Product 2',
      precioUnitario: 100,
      urlImage: 'https://via.placeholder.com/150',
      nombre: 'Product 2',
      existencia: 10,
      activo: true,
      codigoTarifa: this.codigoTarifa1,
    },
    {
      id: 3,
      codigoPrincipal: 'P003',
      descripcion: 'Product 3',
      precioUnitario: 100,
      urlImage: 'https://via.placeholder.com/150',
      nombre: 'Product 3',
      existencia: 10,
      activo: true,
      codigoTarifa: this.codigoTarifa1,
    },
  ];

  filteredProducts: Observable<IProduct[]> =
    this.productControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

  private _filter(value: string): IProduct[] {
    const stringValue = typeof value === 'string' ? value : '';
    const filteredValue = stringValue.toLowerCase();

    return this.products.filter((product) =>
      product.codigoPrincipal.includes(filteredValue)
    );
  }

  onProductSelected(product: IProduct) {
    this.productSelected.emit(product);
  }

  displayFn(product: IProduct): string {
    return product && product.codigoPrincipal ? product.codigoPrincipal : '';
  }
}
