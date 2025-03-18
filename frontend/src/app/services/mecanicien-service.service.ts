import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  getMecanicienByIdOrEmail(param: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${param}`)
  }

  //Modifier un mécanicien
  updateMecanicien(id: string, meca: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, meca)
  }

  //Créer un mécanicien
  createMecanicien(meca: any): Observable<any>{
    return this.http.delete(this.apiUrl, meca)
  }

  //Login mécanicien
  
}
