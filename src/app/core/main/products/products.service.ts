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
  private readonly url = 'http://ec2-3-128-226-4.us-east-2.compute.amazonaws.com:8080/productos';
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {}

  public getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}`);
  }

  public getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }

  public createProduct(product:FormData): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.url}`, product);
  }

  public updateProduct(id: number, product: FormData): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.url}/${id}`, product);
  }

  public deleteProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.url}/${id}`);
  }


}
