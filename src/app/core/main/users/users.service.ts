import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../auth/interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly baseUrl = 'http://localhost:8080/users';

  private http = inject(HttpClient);

  public getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/${id}`);
  }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl);
  }

  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
