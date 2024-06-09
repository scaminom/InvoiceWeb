import { Component, input, output } from '@angular/core';
import { IProduct } from '../../interfaces/product-interface';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-product-card-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './product-card-page.component.html',
  styles: ``
})
export class ProductCardPageComponent {
  products = input.required<IProduct[]>();
  sendProductId = output<number>();

  onDeleteProduct(id: number): void {
    this.sendProductId.emit(id);
  }


}
