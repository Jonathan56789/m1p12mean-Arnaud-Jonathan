import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:5000/api/vehicles';//3000
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }
  getMyVehicles(): Observable<any> {
      return this.http.get(`${this.apiUrl}/myvehicles`, { headers: this.getHeaders() });
  }
}
