import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { Action } from 'src/app/model/action.model';
import { LoginService } from '../login/service/loginService.service';
import { Router } from '@angular/router';
import { LoaderServiceService } from 'src/app/service/loader-service.service';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';

  constructor(
    private loginService: LoginService,
    private router: Router,
    public loaderService: LoaderServiceService,
    private overlay: OverlayContainer
  ){
    this.isUserLoggedIn();
  }

  ngOnInit(){
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
        this.className = darkClassName;
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
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
