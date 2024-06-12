
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, debounceTime, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BrowserStorageService } from '../../../shared/services/browser-storage.service';
import { Router } from '@angular/router';
import { ICodigoTarifa } from './interfaces/tax.interface';


@Injectable({
  providedIn: 'root',
})
export class TaxesService {
  private readonly url = 'http://localhost:8080/tarifa-iva';
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {}

  public getAllTaxesCodes(): Observable<ICodigoTarifa[]> {
    return this.http.get<ICodigoTarifa[]>(`${this.url}`);
  }

  public getTaxById(id: number): Observable<ICodigoTarifa> {
    return this.http.get<ICodigoTarifa>(`${this.url}/${id}`);
  }

  public createTax(tax: ICodigoTarifa): Observable<ICodigoTarifa> {
    return this.http.post<ICodigoTarifa>(`${this.url}`, tax);
  }

  public updateTax(id: number, tax: ICodigoTarifa): Observable<ICodigoTarifa> {
    return this.http.put<ICodigoTarifa>(`${this.url}/${id}`, tax);
  }

  public deleteTax(id: number): Observable<ICodigoTarifa> {
    return this.http.delete<ICodigoTarifa>(`${this.url}/${id}`);
  }


}
