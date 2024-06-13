import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ProductDropdownComponent } from '../product-dropdown/product-dropdown.component';
import { ItemTableComponent } from '../item-table/item-table.component';
import { IProduct } from '../../../products/interfaces/product-interface';
import { InvoiceService } from '../../invoice.service';
import { Item, ItemResponse } from '../../interfaces/invoice-bh.interface';

@Component({
  selector: 'app-item-section',
  standalone: true,
  imports: [ProductDropdownComponent, ItemTableComponent],
  templateUrl: './item-section.component.html',
  styles: ``,
})
export class ItemSectionComponent implements OnInit {
  @ViewChild('invoiceTable') invoiceTable!: ItemTableComponent;
  private invoiceService = inject(InvoiceService);

  ngOnInit(): void {}

  onProductSelected(product: IProduct) {
    this.invoiceTable.addItem(product);
  }

  onItemsChange(Iitems: Item[]): void {
    this.invoiceService.updateItems(Iitems);
  }
}
