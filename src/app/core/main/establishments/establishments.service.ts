import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IEstablismnet } from './interfaces/establishment.iterface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentsService {
  private readonly url = 'http://localhost:8080/establecimiento';
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() { }

  public getAllEstablishments(): Observable<IEstablismnet[]> {
    return this.http.get<IEstablismnet[]>(`${this.url}`);
  }

  public getEstablishmentById(id: number): Observable<IEstablismnet> {
    return this.http.get<IEstablismnet>(`${this.url}/${id}`);
  }

  public createEstablishment(establishment: IEstablismnet): Observable<IEstablismnet> {
    return this.http.post<IEstablismnet>(`${this.url}`, establishment).pipe(
      catchError((error) => {
        let errorMessage = Object.values(error.error).join('<br>');
        return throwError(() => new Error(errorMessage));
      }
      )
    );
  }

  public updateEstablishment(id: number, establishment: IEstablismnet): Observable<IEstablismnet> {
    return this.http.put<IEstablismnet>(`${this.url}/${id}`, establishment).pipe(
      catchError((error) => {
        let errorMessage = Object.values(error.error).join('<br>');
        return throwError(() => new Error(errorMessage));
      }
      )
    );
  }

  public deleteEstablishment(id: string): Observable<IEstablismnet> {
    return this.http.delete<IEstablismnet>(`${this.url}/${id}`).pipe(
      catchError((error) => {
        let errorMessage = Object.values(error.error).join('<br>');
        return throwError(() => new Error(errorMessage));
      }
      )
    );
  }

  
}
