import { Component, ViewChild } from '@angular/core';
import { ProductDropdownComponent } from '../product-dropdown/product-dropdown.component';
import { ItemTableComponent } from '../item-table/item-table.component';
import { IProduct } from '../../../products/interfaces/product-interface';

@Component({
  selector: 'app-item-section',
  standalone: true,
  imports: [ProductDropdownComponent, ItemTableComponent],
  templateUrl: './item-section.component.html',
  styles: ``,
})
export class ItemSectionComponent {
  @ViewChild('invoiceTable') invoiceTable!: ItemTableComponent;

  onProductSelected(product: IProduct) {
    this.invoiceTable.addItem(product);
  }
}
