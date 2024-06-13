import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { IProduct } from '../../../products/interfaces/product-interface';
import { CurrencyPipe } from '@angular/common';
import { ItemResponse } from '../../interfaces/item-response.interface';
import { Item } from '../../interfaces/invoice-bh.interface';

@Component({
  selector: 'app-item-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyPipe,
  ],
  templateUrl: './item-table.component.html',
  styles: ``,
})
export class ItemTableComponent {
  displayedColumns: string[] = [
    'code',
    'description',
    'precio',
    'quantity',
    'discount',
    'actions',
  ];

  dataSource: ItemResponse[] = [];
  @Output() itemsChange = new EventEmitter<Item[]>();

  public addItem(product: IProduct) {
    const newItem: ItemResponse = {
      id: this.dataSource.length + 1,
      cantidad: 1,
      descuento: 0,
      product: product,
    };
    this.dataSource.push(newItem);
    this.dataSource = [...this.dataSource];
    this.itemsChange.emit(this.transformedDataSource());
  }

  saveItem(item: ItemResponse) {
    const index = this.dataSource.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.dataSource[index] = item;
      this.dataSource = [...this.dataSource];
      this.itemsChange.emit(this.transformedDataSource());
    }
  }

  deleteItem(item: ItemResponse) {
    const index = this.dataSource.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
      this.itemsChange.emit(this.transformedDataSource());
    }
  }

  onQuantityChange(item: ItemResponse): void {
    this.saveItem(item);
  }

  onDiscountChange(item: ItemResponse): void {
    this.saveItem(item);
  }

  transformedDataSource(): Item[] {
    return this.dataSource.map((item) => ({
      cantidad: item.cantidad,
      descuento: item.descuento,
      idProducto: item.product.id,
    }));
  }
}
