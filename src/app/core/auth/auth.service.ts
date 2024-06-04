import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILoginResponse } from './interfaces/login-response.interface';
import { BrowserStorageService } from '../../shared/services/browser-storage.service';
import { Router } from '@angular/router';
import { AuthStatus } from './enums/auth-status.enum';
import { IUser } from './interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = 'http://localhost:8080/auth';
  private http = inject(HttpClient);
  private router = inject(Router);
  private localStorage = inject(BrowserStorageService);

  private _authStatus = signal<AuthStatus>(AuthStatus.CHECKING);
  private _user = signal<IUser | null>(null);

  public user = computed(() => this._user());
  public authStatus = computed(() => this._authStatus());

  constructor() {}

  private destructureUser(user: ILoginResponse): IUser {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }

  private setAuthentication(response: ILoginResponse): Observable<boolean> {
    const user = this.destructureUser(response);
    // this._user?.update(() => user);
    this._user?.set({ ...user });
    this.localStorage.setItem('token', response.token);
    this._authStatus.set(AuthStatus.AUTHENTICATED);
    return of(true);
  }

  isAuthenticated(): boolean {
    return this.authStatus() === AuthStatus.AUTHENTICATED;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<ILoginResponse>(`${this.url}/signin`, { username, password })
      .pipe(
        tap((response) => this.setAuthentication(response)),
        map(() => true),
        catchError((error) => {
          console.error('Login failed:', error);
          return of(false);
        })
      );
  }

  logout(): void {
    this._user.set(null);
    this.localStorage.clear();
    this._authStatus.set(AuthStatus.UNAUTHENTICATED);
    this.router.navigate(['/login']);
  }

  checkAuthentication(): Observable<boolean> {
    const token = this.localStorage.getItem('token');
    if (!token) {
      this._authStatus.set(AuthStatus.UNAUTHENTICATED);
      return of(false);
    }

    return this.http.get<ILoginResponse>(`${this.url}/validate`).pipe(
      map(() => {
        this._authStatus.set(AuthStatus.AUTHENTICATED);
        return true;
      }),
      catchError((error) => {
        console.error('Authentication check failed:', error);
        this._authStatus.set(AuthStatus.UNAUTHENTICATED);
        return of(false);
      })
    );
  }
}
