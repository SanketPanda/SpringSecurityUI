import { Component } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpServiceService } from 'src/app/service/http-service.service';
import { LoginService } from '../login/service/loginService.service';
import { registerUserDTO } from 'src/app/model/register.model';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent {

  currentUser!: registerUserDTO;

  constructor(
    private httpService: HttpServiceService,
    private loginService: LoginService,
  ){
    this.initializeFormValues();
  }

  initializeFormValues(){
    if(!this.loginService.isUserLoggedIn()) return;
    this.httpService
      .get(environment.getUserByEmail+this.loginService.getLoggedInUserEmail())
      .subscribe((data: registerUserDTO) => {
        this.currentUser = data;
      });
  }
}
