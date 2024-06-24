import { Component, inject, input, output } from '@angular/core';
import { IProduct } from '../../interfaces/product-interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../auth/auth.service';
import { IUser } from '../../../../auth/interfaces/user-interface';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './product-card-page.component.html',
  styles: ``,
})
export class ProductCardPageComponent {
  product = input.required<IProduct>();
  deleteProduct = output<number>();

  onDeleteProduct(id: number): void {
    this.deleteProduct.emit(id);
  }

  private authServce = inject(AuthService);

  public getUser(): IUser | null {
    return this.authServce?.currentUser;
  }
}
