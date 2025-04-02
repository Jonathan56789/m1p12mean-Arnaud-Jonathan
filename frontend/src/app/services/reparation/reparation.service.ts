import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReparationService {
  private apiUrl = 'http://localhost:5000/api/repairs';
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }
  getRepairsByMechanics(idMeca: string) : Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/${idMeca}`)
  }

  updateRepair(id: string, updatedData: { status: string }): Observable<any> {
    console.log("Update Fonction service")
    console.log(`${this.apiUrl}/${id}`)
    return this.http.put(`${this.apiUrl}/${id}`, updatedData);
  }

  getRepairById(id: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/detail/${id}`)
  }
    // Récupérer l'historique des réparations
  getRepairs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/myrepairs`, { headers: this.getHeaders() });
  }
}
