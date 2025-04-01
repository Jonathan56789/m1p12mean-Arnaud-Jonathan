import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReparationService {

  private apiUrl = 'http://localhost:5000/repairs';
  constructor(private http: HttpClient) { }

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
}
