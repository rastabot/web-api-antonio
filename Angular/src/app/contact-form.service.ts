import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactForm } from './contact-form';


@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  url = 'http://localhost:54525/api/form'

  constructor(private http: HttpClient) { }

  getComplains(): Observable<ContactForm[]>{
    return this.http.get<ContactForm[]>(this.url +"/GetAllComplains")
  }

  postComplain(contactForm: ContactForm): Observable<ContactForm>{
    const httpOption = {headers: new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.post<ContactForm>(this.url +"/CreateComplain", contactForm ,httpOption)
  }

  updateComplain(contactForm: ContactForm): Observable<ContactForm>{
    const httpOption = {headers: new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.put<ContactForm>(this.url + '/UpdateComplain', contactForm, httpOption);
  }


  deleteComplain(formId:number): Observable<number>{
    const httpOption = {headers: new HttpHeaders({'Content-Type':'application/json'})};
    return this.http.delete<number>(this.url +'/DeleteComplain/'+ formId,httpOption);
  }


  
}
