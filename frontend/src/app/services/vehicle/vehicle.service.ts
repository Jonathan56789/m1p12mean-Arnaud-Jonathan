import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = environment.apiUrl+'/vehicles';
  // private token = localStorage.getItem('token');
  constructor(private http: HttpClient) { }
  // private getHeaders(): HttpHeaders {
  //   return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  // }
  // getMyVehicles(): Observable<any> {
  //     return this.http.get(`${this.apiUrl}/myvehicles`, { headers: this.getHeaders() });
  // }
  // createVehicle(vehicle: { licensePlate: string, nameVehicle:string,marqueVehicle:string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/create`, vehicle, { headers: this.getHeaders() });
  // }
  // // Nouvelle méthode pour supprimer un véhicule
  // deleteVehicle(vehicleId: string): Observable<any> {
  //   console.log(vehicleId);
  //   return this.http.delete(`${this.apiUrl}/${vehicleId}`, { headers: this.getHeaders() });
  // }

  getMyVehicles(): Observable<any> {
      return this.http.get(`${this.apiUrl}/myvehicles`);
  }
  createVehicle(vehicle: { licensePlate: string, nameVehicle:string,marqueVehicle:string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, vehicle);
  }
  // Nouvelle méthode pour supprimer un véhicule
  deleteVehicle(vehicleId: string): Observable<any> {
    console.log(vehicleId);
    return this.http.delete(`${this.apiUrl}/${vehicleId}`);
  }
}
