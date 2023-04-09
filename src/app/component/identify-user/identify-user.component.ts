import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { loginUserDTO } from 'src/app/model/login.model';
import { LoginService } from '../login/service/loginService.service';
import { HttpServiceService } from 'src/app/service/http-service.service';
import { environment } from 'src/app/environments/environment';
import { ObjectUtils } from 'src/app/helper/object-utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-identify-user',
  templateUrl: './identify-user.component.html',
  styleUrls: ['./identify-user.component.scss']
})
export class IdentifyUserComponent {
  public loginForm!: FormGroup;
  private errorMsg!: string;
  title: string = 'Reset Password';
  type!: string;


  constructor(
    private httpService: HttpServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.errorMsg = '';
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
    this.activatedRoute.queryParams.subscribe(params => {
      if(!params['type']) this.errorMsg = 'Type not provided';
      this.type = params['type'];
      this.setPageTitle();
    });
  }

  setPageTitle(){
    if(!this.type){
      Swal.fire('Failure', 'Url is broken', 'error').then((result)=>{
        if(result.value){
          this.router.navigate(['/dashboard']);
        }
      });
    }
    if(this.type == 'forget-password'){this.title = 'Forget Password';}
    else if(this.type == 'reset-password'){this.title = 'Reset Password';}
    else {this.title = 'Resend Acoount Verification Link';}
  }

  onFormSubmit(){
    this.errorMsg = '';
    if(this.type && this.type == 'forget-password'){
      this.forgetPassword();
      return;
    }else if(this.type && this.type == 'reset-password'){
      this.resetPassword();
    }else{
      this.resendAccountVerificationLink();
    }
  }

  resetPassword(){
    this.httpService.get(environment.resetPasswordToken + '/' + this.loginForm.controls['email'].value).subscribe((data: any)=>{
      if(!data || data.length<=0) return;
      console.log('data updated');
      console.log(data);
      Swal.fire('success', data.message, 'success');
      this.router.navigate(['/dashboard']);
    },
    (error) => {
      const errorList = ObjectUtils.getKeyValuePair(error.error);
      if(errorList){
        console.log(errorList);
        errorList.forEach(error => {
          if(error.key != 'errorCode')
            if(error.key == 'errorMessage')
            this.errorMsg += error.value + '\n';
            else this.errorMsg += error.key + '-' + error.value + '\n';
        })
        Swal.fire('Failure', this.errorMsg, 'error');
        return;
      }
      this.errorMsg = JSON.stringify(error);
      Swal.fire('Failure', this.errorMsg, 'error');
    }
    )
  }

  forgetPassword(){
    this.httpService.get(environment.forgetPasswordToken + '/' + this.loginForm.controls['email'].value).subscribe((data: any)=>{
      if(!data || data.length<=0) return;
      console.log('data updated');
      console.log(data);
      Swal.fire('success', data.message, 'success');
      this.router.navigate(['/dashboard']);
    },
    (error) => {
      const errorList = ObjectUtils.getKeyValuePair(error.error);
      if(errorList){
        console.log(errorList);
        errorList.forEach(error => {
          if(error.key != 'errorCode')
            if(error.key == 'errorMessage')
            this.errorMsg += error.value + '\n';
            else this.errorMsg += error.key + '-' + error.value + '\n';
        })
        Swal.fire('Failure', this.errorMsg, 'error');
        return;
      }
      this.errorMsg = JSON.stringify(error);
      Swal.fire('Failure', this.errorMsg, 'error');
    }
    )
  }

  resendAccountVerificationLink(){
    this.httpService.get(environment.resendVerificationToken + '/' + this.loginForm.controls['email'].value).subscribe(
      (message: any) => {
        if(!message || message.length<=0) return;
        Swal.fire('success', message, 'success');
      },
      (error) => {
        const errorList = ObjectUtils.getKeyValuePair(error.error);
        if (errorList) {
          errorList.forEach((error) => {
            if (error.key != 'errorCode')
              if (error.key == 'errorMessage')
                this.errorMsg += error.value + '\n';
              else this.errorMsg += error.key + '-' + error.value + '\n';
          });
          Swal.fire('Failure', this.errorMsg, 'error');
          return;
        }
        this.errorMsg = JSON.stringify(error);
        Swal.fire('Failure', this.errorMsg, 'error');
      }
    );
  }

  isFieldValid(field: string) {
    return (
      !this.loginForm.controls[field].valid && this.loginForm.controls[field].touched
    );
  }

  getErrorMessage(field: string) {
    var tempField = field.charAt(0).toUpperCase()+field.substring(1,field.length);
    if (this.loginForm.controls[field].errors?.['required'])
      return tempField + ' is required';
    else if (this.loginForm.controls[field].errors?.['minlength'])
      return tempField + ' must be at least '+this.loginForm.controls[field].errors?.['minlength'].requiredLength+' characters long.';
    else if (this.loginForm.controls[field].errors?.['maxlength'])
      return tempField + ' can not exceed '+this.loginForm.controls[field].errors?.['maxlength'].requiredLength+' characters.';
    else if (this.loginForm.controls[field].errors?.['email'])
      return tempField + ' is not valid.';
    else if (this.loginForm.controls[field].errors?.['pattern'])
      return tempField + ' should contain at least 8 character(Lowercase letters, Uppercase letters, Numbers, Special character).';
    else return '';
  }
}
