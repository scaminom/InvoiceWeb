import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { IProduct } from '../../../products/interfaces/product-interface';
import { ItemResponse } from '../../interfaces/item-response.interface';
import { CurrencyPipe } from '@angular/common';

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

  public addItem(product: IProduct) {
    const newItem: ItemResponse = {
      id: this.dataSource.length + 1,
      cantidad: 1,
      descuento: 0,
      product: product,
    };
    this.dataSource.push(newItem);
    this.dataSource = [...this.dataSource];
  }

  onQuantityChange(item: ItemResponse) {
    const index = this.dataSource.findIndex((i) => i.id === item.id);
    this.dataSource[index] = item;
    this.dataSource = [...this.dataSource];
  }

  onDiscountChange(item: ItemResponse) {
    const index = this.dataSource.findIndex((i) => i.id === item.id);
    this.dataSource[index] = item;
    this.dataSource = [...this.dataSource];
  }
}