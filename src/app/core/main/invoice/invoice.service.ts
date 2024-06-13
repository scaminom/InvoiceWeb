import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice } from './interfaces/invoice.interface';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private http = inject(HttpClient);
  private readonly url = 'http://localhost:8080/factura';
  private invoiceSubject = new BehaviorSubject<Invoice>({
    propina: 0,
    pagos: { formaPago: 'EFECTIVO' },
    items: [],
    idCliente: 0,
    idEstablecimiento: 0,
  });

  public getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.url);
  }
}
