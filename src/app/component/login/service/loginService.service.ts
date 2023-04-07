import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { loginUserDTO } from 'src/app/model/login.model';
import { HttpServiceService } from 'src/app/service/http-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  USER_NAME_SESSION_ATTRIBUTE = 'authenticatedUserData'
  USER_NAME_ATTRIBUTE = 'authenticatedUserEmail'
  email!: string;

  constructor(
    private router: Router,
    private httpService: HttpServiceService
  ) { }

  login(loginDTO: loginUserDTO){
    this.httpService
    .post(environment.login, loginDTO)
    .subscribe(
      (token: any) => {
        this.onSuccessfulLogin(token.accessToken, loginDTO.email);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        alert(error.error.errorMessage);
      }
    );
  }

  onSuccessfulLogin(token: string, email: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE, token);
    sessionStorage.setItem(this.USER_NAME_ATTRIBUTE, email);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE);
    sessionStorage.removeItem(this.USER_NAME_ATTRIBUTE);
  }

  isUserLoggedIn() {
    let token = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE)
    if (token === null) return false
    return true
  }

  getLoggedInUserAuthData() {
    let token = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE);
    if (token === null) return null
    return token;
  }

  getLoggedInUserEmail(){
    let email = sessionStorage.getItem(this.USER_NAME_ATTRIBUTE);
    if (email === null) return null
    return email;
  }
}
