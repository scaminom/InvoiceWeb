import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Item } from '../../interfaces/invoice.interface';
import { IProduct } from '../../../products/interfaces/product-interface';
import { ProductsService } from '../../../products/products.service';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-section',
  standalone: true,
  imports: [MatAutocompleteModule, AsyncPipe, ReactiveFormsModule],
  templateUrl: './item-section.component.html',
  styles: ``,
})
export class ItemSectionComponent implements OnInit {
  items!: Item[];
  products!: IProduct[];
  productService = inject(ProductsService);
  filteredProducts?: Observable<IProduct[]>;
  searchInput = new FormControl<string>('');

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
    this.filteredProducts = this.searchInput.valueChanges.pipe(
      // debounceTime(200),
      startWith(''),
      map((value) => this.filter(value || ''))
    );
  }

  displayProduct(product: IProduct): string {
    return product.codigoPrincipal
      ? product.codigoPrincipal + ' - ' + product.descripcion
      : '';
  }

  private filter(value: string): IProduct[] {
    return this.products?.filter((product) =>
      product.codigoPrincipal.includes(value)
    );
  }
}
