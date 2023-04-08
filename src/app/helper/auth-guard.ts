import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../component/login/service/loginService.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private loginService: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let authData = this.loginService.getLoggedInUserAuthData();
      if (authData) {
            return true;
        }
        console.log('un-authorized access, redirecting to login page');
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}
