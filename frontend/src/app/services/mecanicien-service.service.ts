import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MecanicienServiceService {
  private apiUrl = 'http://localhost:5000/mecanicien';

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformID: object) {
    if (isPlatformBrowser(this.platformID)) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.userSubject.next(JSON.parse(storedUser));
      }
    }
  }


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

  login(email: string, mdp: string): Observable<any> {
    return this.http.post<{ token: any, meca: any }>(`${this.apiUrl}/login`, { email, mdp }).pipe(
      tap({
        next: (res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.meca));
          this.userSubject.next(res.meca)
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: error.error.msg,
          });
        }
      })
    );
  }


  // Méthode pour stocker et récupérer le token JWT
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Vérifie si l'utilisateur est connecté
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    console.log("🔍 Vérification du token :", token);
    return !!token; 
  }


  getUser() {
    return this.userSubject.value;
  }

  // Déconnexion
  logout(): void {
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');
    localStorage.clear(); 
  }
}
