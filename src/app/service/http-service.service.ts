import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../component/login/service/loginService.service';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  get(url: string): Observable<any>{
    return this.http.get(this.baseUrl+url);
  }

  post(url: string, content: any): Observable<any>{
    return this.http.post(this.baseUrl+url, content);
  }

  put(url: string, content: any): Observable<any>{
    return this.http.put(this.baseUrl+url, content);
  }

  delete(url:string, contnet: any): Observable<any> {
    return this.http.delete(this.baseUrl+url, {body:contnet});
  }
}
