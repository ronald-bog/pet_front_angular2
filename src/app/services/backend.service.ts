import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  catalog(page: number, option: number): Observable<any> {
    const body = {
      page: page,
      option: option
    };
    return this.http.post<any>(`${environment.backend}/catalog`, body);
  }

  galeria(page: number, option: number): Observable<any> {
    const body = {
      page: page,
      option: option
    };
    return this.http.post<any>(`${environment.backend}/galeria`, body);
  }

  type(page: number, option: number, type: string): Observable<any> {
    const body = {
      page: page,
      option: option,
      type: type,
    };
    return this.http.post<any>(`${environment.backend}/types`, body);
  }

  contact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${environment.backend}/mail`, contact);
  }

  like(id: number): Observable<any> {
    return this.http.post(`${environment.backend}/like`, {id:id});
  }

  visit(id: number): Observable<any> {
    return this.http.post(`${environment.backend}/visit`, {id:id});
  }
}
