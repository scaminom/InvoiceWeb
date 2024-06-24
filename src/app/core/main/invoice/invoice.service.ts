import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, map } from 'rxjs';
import { Invoice, Item } from './interfaces/invoice-bh.interface';
import { InvoiceResponseInterface } from './interfaces/invoice.interface';
import { TotalResponseInterface } from './interfaces/total-response.interface';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private http = inject(HttpClient);
  private readonly url =
    'http://ec2-3-128-226-4.us-east-2.compute.amazonaws.com:8080/factura';
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

  public createInvoice(invoice: Invoice): Observable<InvoiceResponseInterface> {
    return this.http.post<InvoiceResponseInterface>(this.url, invoice);
  }

  public calculateValues(): Observable<TotalResponseInterface> {
    const currentInvoice = this.invoiceSubject.getValue();
    return this.http
      .post<TotalResponseInterface>(`${this.url}/calculate`, currentInvoice)
      .pipe(
        map((response) => {
          return this.transformValues(response);
        })
      );
  }

  public sendInvoice(invoice: Invoice): Observable<InvoiceResponseInterface> {
    return this.http.post<InvoiceResponseInterface>(
      `${this.url}/create_autorize`,
      invoice
    );
  }

  public getInvoice(): Observable<Invoice> {
    return this.invoiceSubject.asObservable();
  }

  public getInvoiceByID(id: number): Observable<InvoiceResponseInterface> {
    return this.http.get<InvoiceResponseInterface>(`${this.url}/${id}`);
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

  private transformValues(
    value: TotalResponseInterface
  ): TotalResponseInterface {
    return {
      totalSinImpuestos: value.totalSinImpuestos,
      totalDescuento: value.totalDescuento,
      propina: value.propina,
      importeTotal: value.importeTotal,
    };
  }
}
