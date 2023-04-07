import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Action } from 'src/app/model/action.model';
import { LoginService } from '../login/service/loginService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  constructor(
    private loginService: LoginService,
    private router: Router,
  ){
    this.isUserLoggedIn();
  }

  isUserLoggedIn(){
   return this.loginService.isUserLoggedIn();
  }

  logout(){
    this.loginService.logout();
    this.isUserLoggedIn();
    this.router.navigate(['/login']);
  }
}
