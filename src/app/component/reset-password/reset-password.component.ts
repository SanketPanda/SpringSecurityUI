import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { ObjectUtils } from 'src/app/helper/object-utils';
import { HttpServiceService } from 'src/app/service/http-service.service';
import { LoginService } from '../login/service/loginService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  public resetPasswordForm!: FormGroup;
  private errorMsg!: string;
  title: string = 'Reset Password';
  resetPassworToken!: string;

  constructor(
    private httpService: HttpServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService
    ) {
    this.errorMsg = '';
  }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      oldPassword: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}'
        ),
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}'
        ),
      ])
    });
    this.activatedRoute.queryParams.subscribe(params => {
      if(!params['token']) this.errorMsg = 'No reset password token provided';
      this.resetPassworToken = params['token'];
    });
  }

  onFormSubmit(){
    this.errorMsg = '';
    this.httpService.post(environment.resetPassword + '/' +this.resetPassworToken, this.resetPasswordForm.value).subscribe((data: any)=>{
      if(!data || data.length<=0) return;
      Swal.fire('success', data.message, 'success');
      this.loginService.logout();
      this.router.navigate(['/login']);
    }
    )
  }

  isFieldValid(field: string) {
    return (
      !this.resetPasswordForm.controls[field].valid && this.resetPasswordForm.controls[field].touched
    );
  }

  getErrorMessage(field: string) {
    var tempField = field.charAt(0).toUpperCase()+field.substring(1,field.length);
    if (this.resetPasswordForm.controls[field].errors?.['required'])
      return tempField + ' is required';
    else if (this.resetPasswordForm.controls[field].errors?.['minlength'])
      return tempField + ' must be at least '+this.resetPasswordForm.controls[field].errors?.['minlength'].requiredLength+' characters long.';
    else if (this.resetPasswordForm.controls[field].errors?.['maxlength'])
      return tempField + ' can not exceed '+this.resetPasswordForm.controls[field].errors?.['maxlength'].requiredLength+' characters.';
    else if (this.resetPasswordForm.controls[field].errors?.['email'])
      return tempField + ' is not valid.';
    else if (this.resetPasswordForm.controls[field].errors?.['pattern'])
      return tempField + ' should contain at least 8 character(Lowercase letters, Uppercase letters, Numbers, Special character).';
    else return '';
  }
}
