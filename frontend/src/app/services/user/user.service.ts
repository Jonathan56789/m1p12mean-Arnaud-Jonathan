import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users';//3000
  constructor(private http: HttpClient) { }
  
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }


  getMecanonOccupe() : Observable<any>{
    return this.http.get(`${this.apiUrl}/infosup`)
  }
  // Nouvelle méthode pour mettre à jour le profil
  updateProfile(userData: { name?: string; email?: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, userData);

  }
}
