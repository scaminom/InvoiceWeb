import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Item } from '../../interfaces/invoice.interface';
import { IProduct } from '../../../products/interfaces/product-interface';

@Component({
  selector: 'app-table-test-product',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './table-test-product.component.html',
  styles: ``,
})
export class TableTestProductComponent {
  displayedColumns: string[] = [
    'code',
    'description',
    'quantity',
    'discount',
    'actions',
  ];

  dataSource: Item[] = [];

  public addItem(product: IProduct) {
    console.log('Adding item', product);
    const newItem: Item = {
      id: this.dataSource.length + 1,
      cantidad: 1,
      descuento: 0,
      precioTotalSinImpuesto: product.precioUnitario,
      precioUnitario: product.precioUnitario,
      producto: product,
      impuesto: [],
    };
    this.dataSource.push(newItem);
    this.dataSource = [...this.dataSource];
  }

  saveItem(item: Item) {
    const index = this.dataSource.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.dataSource[index] = { ...item, saved: true };
      this.dataSource = [...this.dataSource];
    }
    console.log(this.dataSource);
  }

  editItem(item: Item) {}

  onQuantityChange(item: Item) {
    item.precioTotalSinImpuesto = item.cantidad * item.precioUnitario;
    this.saveItem(item);
  }

  onDiscountChange(item: Item) {
    this.saveItem(item);
  }
}
