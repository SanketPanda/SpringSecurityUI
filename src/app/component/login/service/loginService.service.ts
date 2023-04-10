import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscriber, of } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { loginUserDTO } from 'src/app/model/login.model';
import { HttpServiceService } from 'src/app/service/http-service.service';
import { Router } from '@angular/router';
import { ObjectUtils } from 'src/app/helper/object-utils';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private errorMsg!: string;
  USER_NAME_SESSION_ATTRIBUTE = 'authenticatedUserData';
  USER_NAME_ATTRIBUTE = 'authenticatedUserEmail';
  email!: string;

  constructor(private router: Router, private httpService: HttpServiceService) {
    this.errorMsg = '';
  }

  login(loginDTO: loginUserDTO) {
    this.errorMsg = '';
    this.httpService.post(environment.login, loginDTO).subscribe(
      (token: any) => {
        this.onSuccessfulLogin(token.accessToken, loginDTO.email);
        this.router.navigate(['/user-list']);
      }
    );
  }

  onSuccessfulLogin(token: string, email: string) {
    localStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE, token);
    localStorage.setItem(this.USER_NAME_ATTRIBUTE, email);
  }

  logout() {
    localStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE);
    localStorage.removeItem(this.USER_NAME_ATTRIBUTE);
  }

  isUserLoggedIn() {
    let token = localStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE);
    if (token === null) return false;
    return true;
  }

  getLoggedInUserAuthData() {
    let token = localStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE);
    if (token === null) return null;
    return token;
  }

  getLoggedInUserEmail() {
    let email = localStorage.getItem(this.USER_NAME_ATTRIBUTE);
    if (email === null) return null;
    return email;
  }
}
