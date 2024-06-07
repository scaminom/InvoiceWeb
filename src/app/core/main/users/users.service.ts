import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IUser } from '../../auth/interfaces/user-interface';
import { UpdateUser } from '../interfaces/update-user.interface';
import { CreateUser } from '../interfaces/create-user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly baseUrl = 'http://localhost:8080/users';

  private http = inject(HttpClient);

  public getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.error.message));
      })
    );
  }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl);
  }

  public updateUser(id: number, user: UpdateUser): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, user);
  }

  public createUser(user: CreateUser): Observable<void> {
    return this.http.post<void>(this.baseUrl, user);
  }

  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
