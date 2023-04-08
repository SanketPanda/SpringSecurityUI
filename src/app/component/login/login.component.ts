import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { loginUserDTO } from 'src/app/model/login.model';
import { HttpServiceService } from 'src/app/service/http-service.service';
import { LoginService } from './service/loginService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  errorMsg!: String;

  constructor(
    private loginService: LoginService,
    private router: Router
    ) {
    this.errorMsg = '';
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }

  onFormSubmit(){
    const userDTO = this.loginForm.value as loginUserDTO;
    this.loginService.login(userDTO);
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
