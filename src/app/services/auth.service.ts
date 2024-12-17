import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth-token';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private apiUrl: string = environment.apiUrl + '/Auth';

  public isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Check if the user is currently logged in (used for direct checks)
  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  // Perform login
  login(username: string, password: string): Observable<boolean> {
    const payload = { username, password };

    return this.http.post<any>(`${this.apiUrl}/Login`, payload).pipe(
        map((response) => {
          // Check if response contains the token
          if (response?.result?.token) {
            localStorage.setItem(this.tokenKey, response.result.token);
            this.loggedIn.next(true); // Notify all observers about the login state
            return true;
          }
          throw new Error('Invalid token structure');
        }),
        catchError((error) => {
          console.error('Login error:', error);
          this.loggedIn.next(false); // Notify observers of failed login
          return of(false);
        })
    );
  }

  // Perform registration
  register(name: string, username: string, password: string): Observable<boolean> {
    const payload = { name, username, password };

    return this.http.post<any>(`${this.apiUrl}/Register`, payload).pipe(
        map((response) => {
          if (response?.success) {
            return true;
          }
          throw new Error('Invalid Register response');
        }),
        catchError((error) => {
          console.error('Register error:', error);
          return of(false);
        })
    );
  }

  // Perform logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false); // Notify observers of logout
    this.router.navigate(['/login']);
  }

  // Retrieve JWT token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Retrieve user profile from the token
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

  // Check if a valid token exists
  private hasToken(): boolean {
    return !!this.getToken();
  }
}
