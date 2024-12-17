import { Injectable } from '@angular/core';
import { Token } from '../models/api-results.model';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {jwtDecode} from "jwt-decode";
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth-token';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private apiUrl: string = environment.apiUrl + '/Auth';

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  login(username: string, password: string): Observable<boolean> {
    const payload = { username, password };

    return this.http.post<any>(`${this.apiUrl}/Login`, payload).pipe(
        map((response) => {
          // Check if response contains result and token
          if (response?.result?.token) {
            localStorage.setItem(this.tokenKey, response.result.token);
            this.loggedIn.next(true);
            return true;
          }
          throw new Error('Invalid token structure');
        }),
        catchError((error) => {
          console.error('Login error:', error);
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

  getUserProfile(): UserProfile | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode<any>(token);
        return {
          Id: decodedToken['Id'] || '',
          Name: decodedToken['Name'] || '',
          Username: decodedToken['Username'] || '',
          Exp: decodedToken['exp'] || 0,
        } as UserProfile;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return null;
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }
}
