import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../invoice.service';
import Swal from 'sweetalert2';
import { InvoiceResponseInterface } from '../../interfaces/invoice.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-invoice.component.html',
  styleUrl: './show-invoice.component.css',
})
export class ShowInvoiceComponent implements OnInit {
  invoice!: InvoiceResponseInterface;
  private activeRoute = inject(ActivatedRoute);
  private facturaService = inject(InvoiceService);
  private router = inject(Router);

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      const id = params['id'];
      this.retrievet(id);
    });
  }

  private retrievet(id: number): void {
    this.facturaService.getInvoiceByID(id).subscribe({
      next: (invoice) => {
        this.invoice = invoice;
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se puede obtener la factura',
          icon: 'error',
        });
        this.router.navigate(['/dashboard/invoice']);
      },
    });
  }
}
