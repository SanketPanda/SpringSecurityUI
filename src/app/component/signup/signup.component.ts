import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { ObjectUtils } from 'src/app/helper/object-utils';
import { registerUserDTO } from 'src/app/model/register.model';
import { HttpServiceService } from 'src/app/service/http-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  private errorMsg!: string;

  constructor(
    private router: Router,
    private httpService: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      roles: new FormControl(null),
      userId: new FormControl(null),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(45),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(45),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
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
  }

  onFormSubmit() {
    if (!this.validatePassword()) return;
    const userDTO: any = this.signupForm.value as registerUserDTO;
    userDTO.roles = 'USER';
    delete userDTO['confirmPassword'];
    this.errorMsg = '';
    this.httpService.post(environment.signUp, userDTO).subscribe(
      (data: registerUserDTO) => {
        Swal.fire('success', 'A verification link has been sent to your registered email, please use the link to activate your account.','success');
        this.router.navigate(['/login']);
      },
      (error) => {
        const errorList = ObjectUtils.getKeyValuePair(error.error);
        if (errorList) {
          console.log(errorList);
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

  validatePassword() {
    if (
      this.signupForm.controls['password'].value ==
      this.signupForm.controls['confirmPassword'].value
    ) {
      return true;
    }
    Swal.fire('Failure', 'Password did not match!', 'error');
    return false;
  }

  isFieldValid(field: string) {
    return (
      !this.signupForm.controls[field].valid &&
      this.signupForm.controls[field].touched
    );
  }

  getErrorMessage(field: string) {
    var tempField =
      field.charAt(0).toUpperCase() + field.substring(1, field.length);
    if (this.signupForm.controls[field].errors?.['required'])
      return tempField + ' is required';
    else if (this.signupForm.controls[field].errors?.['minlength'])
      return (
        tempField +
        ' must be at least ' +
        this.signupForm.controls[field].errors?.['minlength'].requiredLength +
        ' characters long.'
      );
    else if (this.signupForm.controls[field].errors?.['maxlength'])
      return (
        tempField +
        ' can not exceed ' +
        this.signupForm.controls[field].errors?.['maxlength'].requiredLength +
        ' characters.'
      );
    else if (this.signupForm.controls[field].errors?.['email'])
      return tempField + ' is not valid.';
    else if (this.signupForm.controls[field].errors?.['pattern'])
      return (
        tempField +
        ' should contain at least 8 character(Lowercase letters, Uppercase letters, Numbers, Special character).'
      );
    else return '';
  }
}
