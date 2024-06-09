import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../interfaces/product-interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './product-card-page.component.html',
  styles: ``, // Si tienes estilos específicos para este componente
})
export class ProductCardPageComponent {
  @Input() product!: IProduct;
  @Output() deleteProduct = new EventEmitter<number>();

  onDeleteProduct(): void {
    console.log('delete product');
    this.deleteProduct.emit(this.product.id);
    console.log('delete product', this.product.id);
  }
}


