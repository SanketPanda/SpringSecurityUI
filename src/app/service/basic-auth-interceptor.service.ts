import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoginService } from '../component/login/service/loginService.service';
import { LoaderServiceService } from './loader-service.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthInterceptorService implements HttpInterceptor {

  constructor(
    private loginService: LoginService,
    public loaderService: LoaderServiceService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    this.loaderService.isLoading.next(true);
    let authData = this.loginService.getLoggedInUserAuthData();
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + authData);
    if(authData){
      request = request.clone({
        headers: headers,
      });
    }
    return next.handle(request).pipe(
      finalize(
        () => {
          this.loaderService.isLoading.next(false);
        }
      )
    )
  }
}
