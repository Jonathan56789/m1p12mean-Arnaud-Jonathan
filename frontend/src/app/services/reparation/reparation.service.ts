import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReparationService {
  private apiUrl = environment.apiUrl+'/repairs';
  constructor(private http: HttpClient) { }
  getAllRepairs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`)
  }

  getRepairsByMechanics() : Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/reparationMeca`);
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
    return this.http.get(`${this.apiUrl}/myrepairs`);
  }

  createRepair(repair: any) : Observable<any>{
    return this.http.post(`${this.apiUrl}/create`, repair)
  }
  // Récupérer l'historique des réparations
  getHistoryRepairs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/history`);

  }
}
