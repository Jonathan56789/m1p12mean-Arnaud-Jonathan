import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = environment.apiUrl+'/notifications';
  constructor(private http: HttpClient) { }
  getNotifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }
}
