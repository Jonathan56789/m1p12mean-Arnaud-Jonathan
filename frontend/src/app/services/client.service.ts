import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:5000/api/client';//3000
  private token = localStorage.getItem('token');
  constructor(private http: HttpClient) {
    console.log("rrrrrrrrrrrrrrr");
    console.log(this.token);
  }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  // Récupérer les véhicules avec leurs nouveaux champs (details, estimatedCompletion, technician)
  getVehicles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehicles`, { headers: this.getHeaders() });
  }

  // Récupérer les rendez-vous
  getAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/appointment`, { headers: this.getHeaders() });
  }

  // Prendre un rendez-vous
  bookAppointment(appointment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/appointment`, appointment, { headers: this.getHeaders() });
  }

  // Récupérer l'historique des réparations
  getRepairs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/repairs`, { headers: this.getHeaders() });
  }
  // Méthode mise à jour avec un paramètre optionnel "all"
  // getRepairs(showAll: boolean = false): Observable<any> {
  //   const url = `${this.apiUrl}/repairs${showAll ? '?all=true' : ''}`;
  //   return this.http.get(url, { headers: this.getHeaders() });
  // }
  // Demander un devis
  // requestQuote(quote: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/quote`, quote, { headers: this.getHeaders() });
  // }
  // Mise à jour pour gérer FormData
  requestQuote(quote: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/quote`, quote, { headers: this.getHeaders() });
  }
  // Récupérer les notifications avec les nouveaux champs (details, urgent)
  getNotifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notifications`, { headers: this.getHeaders() });
  }

  // Mettre à jour le token après connexion (optionnel, si vous voulez rafraîchir le token dynamiquement)
  // updateToken(token: string) {
  //   this.token = token;
  //   localStorage.setItem('token', token);
  // }
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  // Nouvelle méthode pour récupérer les devis
  getQuotes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/quotes`, { headers: this.getHeaders() });
  }
   // Récupérer les rendez-vous
   getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, { headers: this.getHeaders() });
  }
  // Récupérer les véhicules
  getMyVehicles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehicles`, { headers: this.getHeaders() });
  }
  // Créer un nouveau véhicule
  createVehicle(vehicle: { licensePlate: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/vehicles`, vehicle, { headers: this.getHeaders() });
  }
  // Nouvelle méthode pour supprimer un véhicule
  deleteVehicle(vehicleId: string): Observable<any> {
    console.log(vehicleId);
    return this.http.delete(`${this.apiUrl}/vehicles/${vehicleId}`, { headers: this.getHeaders() });
  }
}
