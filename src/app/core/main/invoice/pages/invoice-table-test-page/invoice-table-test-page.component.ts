import { Component, ViewChild } from '@angular/core';
import { ProductDropdownComponent } from '../../components/product-dropdown/product-dropdown.component';
import { IProduct } from '../../../products/interfaces/product-interface';
import { TableTestProductComponent } from '../../components/table-test-product/table-test-product.component';

@Component({
  selector: 'app-invoice-table-test-page',
  standalone: true,
  imports: [ProductDropdownComponent, TableTestProductComponent],
  templateUrl: './invoice-table-test-page.component.html',
  styles: ``,
})
export class InvoiceTableTestPageComponent {
  @ViewChild('invoiceTable') invoiceTable!: TableTestProductComponent;

  onProductSelected(product: IProduct) {
    this.invoiceTable.addItem(product);
  }
}
