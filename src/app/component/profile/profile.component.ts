import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/app/environments/environment';
import { HttpServiceService } from 'src/app/service/http-service.service';
import { LoginService } from '../login/service/loginService.service';
import { registerUserDTO } from 'src/app/model/register.model';
import { ObjectUtils } from 'src/app/helper/object-utils';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public editForm!: FormGroup;
  private errorMsg!: string;
  canEditUser!: boolean;

  constructor(
    private httpService: HttpServiceService,
    private loginService: LoginService,
    private router: Router
  ){
    this.initializeFormValues();
    this.errorMsg = '';
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      roles: new FormControl('USER',),
      userId: new FormControl(null,),
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
        Validators.required
      ])
    });
  }

  onEdit(){
    this.canEditUser = true;
  }

  onCancel(){
    this.initializeFormValues();
    this.canEditUser = false;
  }

  updateUser(){
    this.errorMsg = '';
    this.httpService.put(environment.users+'/update', this.editForm.value).subscribe((data: registerUserDTO)=>{
      this.initializeFormValues();
      this.canEditUser = false;
    }
    )
  }

  initializeFormValues(){
    this.httpService
      .get(environment.getUserByEmail+this.loginService.getLoggedInUserEmail())
      .subscribe((data: registerUserDTO) => {
        this.editForm.controls['userId'].setValue(data.userId);
        this.editForm.controls['firstName'].setValue(data.firstName);
        this.editForm.controls['lastName'].setValue(data.lastName);
        this.editForm.controls['email'].setValue(data.email);
        this.editForm.controls['password'].setValue(data.password);
      });
      this.canEditUser = false;
  }

  isFieldValid(field: string) {
    return (
      !this.editForm.controls[field].valid &&
      this.editForm.controls[field].touched
    );
  }

  getErrorMessage(field: string) {
    var tempField =
      field.charAt(0).toUpperCase() + field.substring(1, field.length);
    if (this.editForm.controls[field].errors?.['required'])
      return tempField + ' is required';
    else if (this.editForm.controls[field].errors?.['minlength'])
      return (
        tempField +
        ' must be at least ' +
        this.editForm.controls[field].errors?.['minlength'].requiredLength +
        ' characters long.'
      );
    else if (this.editForm.controls[field].errors?.['maxlength'])
      return (
        tempField +
        ' can not exceed ' +
        this.editForm.controls[field].errors?.['maxlength'].requiredLength +
        ' characters.'
      );
    else if (this.editForm.controls[field].errors?.['email'])
      return tempField + ' is not valid.';
    else if (this.editForm.controls[field].errors?.['pattern'])
      return (
        tempField +
        ' should contain at least 8 character(Lowercase letters, Uppercase letters, Numbers, Special character).'
      );
    else return '';
  }
}
