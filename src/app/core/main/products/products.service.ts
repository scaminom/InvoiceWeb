import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './interfaces/product-interface';
import { ICodigoTarifa } from '../taxes/interfaces/tax.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly url = 'http://ec2-3-128-226-4.us-east-2.compute.amazonaws.com:8080/productos';
  private http = inject(HttpClient);

  constructor() { }

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

  public getAllTaxsCodes(): Observable<ICodigoTarifa[]> {
    return this.http.get<ICodigoTarifa[]>('http://localhost:8080/tarifa-iva');
  }

}
