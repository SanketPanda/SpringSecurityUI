import { Component} from '@angular/core';
import { LoginService } from '../login/service/loginService.service';
import { Router } from '@angular/router';
import { LoaderServiceService } from 'src/app/service/loader-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{


  constructor(
    private loginService: LoginService,
    private router: Router,
    public loaderService: LoaderServiceService
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
