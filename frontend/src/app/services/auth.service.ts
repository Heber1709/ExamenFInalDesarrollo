import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    username: string;
    role?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/auth';
  private readonly TOKEN_KEY = 'rickflix_token';
  private readonly USER_KEY = 'rickflix_user';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        if (res.success && res.token) {
          localStorage.setItem(this.TOKEN_KEY, res.token);
          if (res.user) {
            localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
          }
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): { username: string } | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}

