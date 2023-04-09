import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { ObjectUtils } from 'src/app/helper/object-utils';
import { HttpServiceService } from 'src/app/service/http-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  public forgetPasswordForm!: FormGroup;
  private errorMsg!: string;
  title: string = 'Foorget Password';
  forgetPassworToken!: string;

  constructor(
    private httpService: HttpServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.errorMsg = '';
  }

  ngOnInit(): void {
    this.forgetPasswordForm = new FormGroup({
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}'
        ),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}'
        ),
      ]),
    });
    this.activatedRoute.queryParams.subscribe(params => {
      if(!params['token']) this.errorMsg = 'No forget password token provided';
      this.forgetPassworToken = params['token'];
    });
  }

  onFormSubmit(){
    if (!this.validatePassword()) return;
    this.errorMsg = '';
    this.httpService.post(environment.forgetPassword + '/' +this.forgetPassworToken, this.forgetPasswordForm.value).subscribe((data: any)=>{
      if(!data || data.length<=0) return;
      console.log('data updated');
      console.log(data);
      Swal.fire('success', data.message, 'success');
      this.router.navigate(['/login']);
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

  validatePassword() {
    if (
      this.forgetPasswordForm.controls['newPassword'].value ==
      this.forgetPasswordForm.controls['confirmPassword'].value
    ) {
      return true;
    }
    Swal.fire('Failure', 'Password did not match!', 'error');
    return false;
  }

  isFieldValid(field: string) {
    return (
      !this.forgetPasswordForm.controls[field].valid && this.forgetPasswordForm.controls[field].touched
    );
  }

  getErrorMessage(field: string) {
    var tempField = field.charAt(0).toUpperCase()+field.substring(1,field.length);
    if (this.forgetPasswordForm.controls[field].errors?.['required'])
      return tempField + ' is required';
    else if (this.forgetPasswordForm.controls[field].errors?.['minlength'])
      return tempField + ' must be at least '+this.forgetPasswordForm.controls[field].errors?.['minlength'].requiredLength+' characters long.';
    else if (this.forgetPasswordForm.controls[field].errors?.['maxlength'])
      return tempField + ' can not exceed '+this.forgetPasswordForm.controls[field].errors?.['maxlength'].requiredLength+' characters.';
    else if (this.forgetPasswordForm.controls[field].errors?.['email'])
      return tempField + ' is not valid.';
    else if (this.forgetPasswordForm.controls[field].errors?.['pattern'])
      return tempField + ' should contain at least 8 character(Lowercase letters, Uppercase letters, Numbers, Special character).';
    else return '';
  }
}
