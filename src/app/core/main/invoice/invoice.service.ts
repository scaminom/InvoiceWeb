import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice, Item } from './interfaces/invoice-bh.interface';
import { InvoiceResponseInterface } from './interfaces/invoice.interface';

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

  public getInvoices(): Observable<InvoiceResponseInterface[]> {
    return this.http.get<InvoiceResponseInterface[]>(this.url);
  }

  public getInvoice(): Observable<Invoice> {
    return this.invoiceSubject.asObservable();
  }

  public updateInvoice(invoice: Invoice): void {
    this.invoiceSubject.next(invoice);
  }

  public updateItems(items: Item[]): void {
    const currentInvoice = this.invoiceSubject.getValue();
    this.invoiceSubject.next({ ...currentInvoice, items });
  }

  public updateClient(idCliente: number): void {
    const currentInvoice = this.invoiceSubject.getValue();
    this.invoiceSubject.next({ ...currentInvoice, idCliente });
  }

  public updateEstablecimiento(idEstablecimiento: number): void {
    const currentInvoice = this.invoiceSubject.getValue();
    this.invoiceSubject.next({ ...currentInvoice, idEstablecimiento });
  }
}
