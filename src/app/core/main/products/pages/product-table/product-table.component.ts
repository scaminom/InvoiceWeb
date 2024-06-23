import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../interfaces/product-interface';
import { ProductsService } from '../../products.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { needConfirmation } from '../../../../../shared/components/confirm-dialog/decorators/confirm-dialog.decorator';
import { ProductCardPageComponent } from '../../components/product-card-page/product-card-page.component';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ProductCardPageComponent, MatIcon], // Importa los módulos necesarios
  templateUrl: './product-table.component.html',
  styles: ``,
})
export class ProductTableComponent implements OnInit{
  products : IProduct[] = [];

  private productService = inject(ProductsService);

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(id: number): void {
    Swal.fire({
      title: "¿Estás seguro de eliminar esto?",
      text: "Los cambios serán irreversibles",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, elimínalo"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(() => {
          this.products = this.products.filter((product) => product.id !== id);
        });
      }
    });
  }
}
