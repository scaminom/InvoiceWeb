import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from './interfaces/invoice.interface';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private http = inject(HttpClient);
  private readonly url = 'http://localhost:8080/factura';

  public getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.url);
  }
}
