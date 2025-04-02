import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:5000/api/appointment';//3000
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }
    // Récupérer les rendez-vous
  getAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`, { headers: this.getHeaders() });
  }
  bookAppointment(appointment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, appointment, { headers: this.getHeaders() });
  }
}
