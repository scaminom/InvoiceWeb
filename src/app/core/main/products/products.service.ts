import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, debounceTime, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BrowserStorageService } from '../../../shared/services/browser-storage.service';
import { Router } from '@angular/router';
import { IProduct } from './interfaces/product-interface';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly url = 'http://localhost:8080/productos';
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {}

  public getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}`);
  }

  public getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }

  public createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.url}`, product);
  }

  public updateProduct(id: number, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.url}/${id}`, product);
  }

  public deleteProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.url}/${id}`);
  }


}
