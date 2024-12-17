import { Injectable } from '@angular/core';
import { ApiResult, Token } from '../models/api-results.model';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth-token'; // Local storage key for JWT
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private apiUrl: string = environment.apiUrl + '/Auth';

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  login(username: string, password: string): Observable<boolean> {
    const payload = { username, password };

    return this.http.post<ApiResult<Token>>(`${this.apiUrl}/Login`, payload).pipe(
        map(response => {
          console.log('Response from API:', response); // Log the API response

          if (response && response.success && response.result?.token) {
            const token = response.result.token;
            localStorage.setItem(this.tokenKey, token);
            this.loggedIn.next(true);
            return true;
          } else {
            console.error('Unexpected response structure:', response);
            throw new Error('Invalid response structure');
          }
        }),
        catchError(err => {
          console.error('Login error:', err);
          return of(false); // Return false on error
        })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }
}
