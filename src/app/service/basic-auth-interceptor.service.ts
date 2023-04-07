import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthInterceptorService implements HttpInterceptor {

  constructor(
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let authData = sessionStorage.getItem('authenticatedUserData');
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + authData);
    if(authData){
      request = request.clone({
        headers: headers,
      });
    }
    return next.handle(request);
  }
}
