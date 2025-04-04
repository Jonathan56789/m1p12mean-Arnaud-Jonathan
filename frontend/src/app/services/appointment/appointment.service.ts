import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = environment.apiUrl+'/appointment';//3000
  constructor(private http: HttpClient) { }
    // Récupérer les rendez-vous
  getAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }
  getMyAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/myappointment`);
  }
  updateAppointment(id: string, updatedData: { status: string }): Observable<any> {
    console.log("Update Fonction service")
    console.log(`${this.apiUrl}/${id}`)
    return this.http.put(`${this.apiUrl}/${id}`, updatedData);
  }
  bookAppointment(appointment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, appointment);
  }

  

}
