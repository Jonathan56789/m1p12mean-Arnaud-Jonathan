import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MecanicienServiceService {
  private apiUrl = 'http://localhost:5000/mecanicien'
  constructor(private http: HttpClient) { }

  // Lire touts les mécaniciens
  getAllMecanicien(): Observable<any> {
    return this.http.get(this.apiUrl)
  }

  //Lire 1 mécanicien par email ou ID
  getMecanicienByIdOrEmail(param: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${param}`)
  }

  //Modifier un mécanicien
  updateMecanicien(id: string, meca: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, meca)
  }

  //Créer un mécanicien
  createMecanicien(meca: any): Observable<any> {
    return this.http.delete(this.apiUrl, meca)
  }

  //Login mécanicien
  login(email: string, mdp: string): Observable<any> {
    // console.log("Login service")
    return this.http.post<{token: any, meca: any}>(`${this.apiUrl}/login`, { email, mdp }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token); // 🔥 Stocke le token JWT
        localStorage.setItem('user', JSON.stringify(res.meca)); // 🔥 Stocke les infos du mécanicien
      })
    );
  }

  // Méthode pour stocker et récupérer le token JWT
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Vérifie si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!this.getToken(); // Renvoie true si un token existe
  }
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; 
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
