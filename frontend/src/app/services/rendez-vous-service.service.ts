import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezVousServiceService {
  private apiURL = "http://localhost:5000/dashboard"
  constructor(private http: HttpClient) { }

  getRdv(): Observable<any>{
    return this.http.get(this.apiURL)
  }

  addRdv(rdv: any): Observable<any>{
    return this.http.post(this.apiURL, rdv)
  }

  updateRdv(id: number, rdv: any): Observable<any>{
    return this.http.put(`${this.apiURL}/${id}`, rdv)
  }

  deleteRdv(id: number): Observable<any>{
    return this.http.delete(`${this.apiURL}/${id}`)
  }
}
