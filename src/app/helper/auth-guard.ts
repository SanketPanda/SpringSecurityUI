import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../component/login/service/loginService.service';
import Swal from 'sweetalert2';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private loginService: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let authData = this.loginService.getLoggedInUserAuthData();
      if (authData) {
            return true;
        }
        Swal.fire({
          title: 'Failure!',
          text: "Unauthorized access, please login.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Login',
          cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.value) {
          this.router.navigate(['/login']);
        } else if(result.dismiss == Swal.DismissReason.cancel){

        }
    })
        return false;
    }
}
