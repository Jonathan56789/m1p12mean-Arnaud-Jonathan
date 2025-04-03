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



  getAllRepairs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`)
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }
  getRepairsByMechanics() : Observable<any[]>{


    return this.http.get<any[]>(`${this.apiUrl}/reparationMeca`, { headers: this.getHeaders() });

  }

  updateRepair(id: string, updatedData: { status: string }): Observable<any> {
    console.log("Update Fonction service")
    console.log(`${this.apiUrl}/${id}`)
    return this.http.put(`${this.apiUrl}/${id}`, updatedData);
  }

  getRepairById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/detail/${id}`)
  }
    // Récupérer status des réparations
  getRepairs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/myrepairs`, { headers: this.getHeaders() });
  }

  createRepair(repair: any) : Observable<any>{
    return this.http.post(`${this.apiUrl}/create`, repair)
  }
  // Récupérer l'historique des réparations
  getHistoryRepairs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/history`, { headers: this.getHeaders() });

  }
}
