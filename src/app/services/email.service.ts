import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:8080/api/emails/send';

  constructor(private http: HttpClient) { }

  sendEmail(emailRequest: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, emailRequest);
  }
}
