import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { LoginService } from '../component/login/service/loginService.service';
import { LoaderServiceService } from './loader-service.service';
import Swal from 'sweetalert2';
import { ObjectUtils } from '../helper/object-utils';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthInterceptorService implements HttpInterceptor {
  errorMsg!: string;

  constructor(
    private loginService: LoginService,
    public loaderService: LoaderServiceService,
    private router: Router
  ) {
    this.errorMsg = '';
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);
    let authData = this.loginService.getLoggedInUserAuthData();
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + authData);
    if (authData) {
      request = request.clone({
        headers: headers,
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        console.error('error is intercept', error);
        const errorList = ObjectUtils.getKeyValuePair(error.error);
        this.errorMsg = '';
        if (errorList) {
          errorList.forEach((error) => {
            if (error.key != 'errorCode')
              if (error.key == 'errorMessage')
                this.errorMsg += error.value + '\n';
              else this.errorMsg += error.key + '-' + error.value + '\n';
          });
          Swal.fire('Failure', this.errorMsg, 'error');
          return throwError(error.message);
        }
        if (error.status == 401) {
          Swal.fire('Failure', 'Unauthorized access, please relogin.', 'error');
          this.loginService.logout();
          this.router.navigate(['/login']);
          return throwError(error.message);
        }
        Swal.fire('Failure', 'Unauthorized access, please relogin.', 'error');
        this.loginService.logout();
        this.router.navigate(['/login']);
        return throwError(error.message);
      }),
      finalize(() => {
        this.loaderService.isLoading.next(false);
      })
    );
  }
}
