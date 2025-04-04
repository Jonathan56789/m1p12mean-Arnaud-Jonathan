import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users';//3000
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, { headers: this.getHeaders() });
  }

  // get mécanicien non occupé
  getMecanonOccupe() : Observable<any>{
    return this.http.get(`${this.apiUrl}/infosup`)
  }
  // Nouvelle méthode pour mettre à jour le profil
  updateProfile(userData: { name?: string; email?: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, userData, { headers: this.getHeaders() });
  }
  //get all mécanicien
  getAllMechanics() : Observable<any>{
    return this.http.get(`${this.apiUrl}/listuser/mecanicien`)
  }
}
