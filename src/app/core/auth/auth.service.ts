import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface User {
  id: string;
  email: string;
  name: string;
  token?: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private apiUrl = `${environment.apiUrl}/auth`;
  
  constructor(private http: HttpClient) {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }
  
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  
  login(email: string, password: string): Observable<User> {
    // This is a placeholder - replace with actual API integration
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          const user = { ...response.user, token: response.token };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }
  
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
  
  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
  
  // This method will be implemented when you integrate with your auth API
  refreshToken(): Observable<any> {
    // Placeholder for token refresh logic
    return of(null);
  }
}