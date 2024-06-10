import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEstablishment } from './interfaces/establishment.iterface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentsService {
  private readonly url = 'http://localhost:8080/establecimiento';
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() { }

  public getAllEstablishments(): Observable<IEstablishment[]> {
    return this.http.get<IEstablishment[]>(`${this.url}`);
  }

  public getEstablishmentById(id: number): Observable<IEstablishment> {
    return this.http.get<IEstablishment>(`${this.url}/${id}`);
  }

  public createEstablishment(establishment: IEstablishment): Observable<IEstablishment> {
    return this.http.post<IEstablishment>(`${this.url}`, establishment).pipe(
      catchError((error) => {
        let errorMessage = Object.values(error.error).join('<br>');
        return throwError(() => new Error(errorMessage));
      }
      )
    );
  }

  public updateEstablishment(id: number, establishment: IEstablishment): Observable<IEstablishment> {
    return this.http.put<IEstablishment>(`${this.url}/${id}`, establishment).pipe(
      catchError((error) => {
        let errorMessage = Object.values(error.error).join('<br>');
        return throwError(() => new Error(errorMessage));
      }
      )
    );
  }

  public deleteEstablishment(id: string): Observable<IEstablishment> {
    return this.http.delete<IEstablishment>(`${this.url}/${id}`).pipe(
      catchError((error) => {
        let errorMessage = Object.values(error.error).join('<br>');
        return throwError(() => new Error(errorMessage));
      }
      )
    );
  }

  
}
