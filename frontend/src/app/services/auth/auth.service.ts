import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api/users';

    constructor(private http: HttpClient) {}

    login(email: string, password: string,role: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, { email, password,role });
    }

    saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }
      // Vérifie si l'utilisateur est connecté
    isAuthenticated(): boolean {
      return !!this.getToken(); // Renvoie true si un token existe
    }
    
}
