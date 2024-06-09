import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEstablismnets } from './interfaces/establishments.iterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentsService {
  private readonly url = 'http://localhost:8080/establecimiento';
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() { }

  public getAllEstablishments(): Observable<IEstablismnets[]> {
    return this.http.get<IEstablismnets[]>(`${this.url}`);
  }

  public getEstablishmentById(id: number): Observable<IEstablismnets> {
    return this.http.get<IEstablismnets>(`${this.url}/${id}`);
  }

  public createEstablishment(establishment: IEstablismnets): Observable<IEstablismnets> {
    return this.http.post<IEstablismnets>(`${this.url}`, establishment);
  }

  public updateEstablishment(id: number, establishment: IEstablismnets): Observable<IEstablismnets> {
    return this.http.put<IEstablismnets>(`${this.url}/${id}`, establishment);
  }

  public deleteEstablishment(id: string): Observable<IEstablismnets> {
    return this.http.delete<IEstablismnets>(`${this.url}/${id}`);
  }

  
}
