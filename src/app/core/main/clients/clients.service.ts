import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IClient } from './interfaces/client-interface';
import { UpdateClient } from './interfaces/update-client.interface'; 
import { CreateClient } from './interfaces/create-client.interface';
@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly baseUrl = 'http://ec2-3-128-226-4.us-east-2.compute.amazonaws.com:8080/clients';

  private http = inject(HttpClient);

  public getClientById(id: number): Observable<IClient> {
    return this.http.get<IClient>(`${this.baseUrl}/${id}`).pipe(
      catchError((error)=>{
        return throwError (()=> new Error(error.error.message));
      }

      )
    );
  }

  public getClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.baseUrl);
  }

  public updateClient(id: number, client: UpdateClient): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, client);
  }

  public createClient(client: CreateClient): Observable<void> {
    return this.http.post<void>(this.baseUrl, client);
  }

  public deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
