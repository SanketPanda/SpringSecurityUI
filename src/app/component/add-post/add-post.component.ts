import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { postDTO } from 'src/app/model/post.model';
import { HttpServiceService } from 'src/app/service/http-service.service';
import Swal from 'sweetalert2';
import { LoginService } from '../login/service/loginService.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  @Output() onPostListChange = new EventEmitter<any>();
  public postForm!: FormGroup;
  isValidData: Boolean = false;
  private errorMsg!: string;

  constructor(
    private httpService: HttpServiceService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      postId: new FormControl(null),
      postDescription: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500),
      ]),
    });
  }

  onFormSubmit() {
    if(!this.postForm.controls['postDescription'].valid){
      Swal.fire('Failure', 'Post description should be at least 5 character long.', 'error');
      return;
    }
    const postDTO: any = this.postForm.value as postDTO;
    postDTO.email = this.loginService.getLoggedInUserEmail();
    postDTO.isPublicPost = true;
    this.errorMsg = '';
    this.httpService.post(environment.createPost, postDTO).subscribe(
      (data: postDTO) => {
        this.postForm.reset();
        Swal.fire('success', 'Post created successfully','success');
        this.onPostListChange.emit();
      }
    );
  }

  isFieldValid(field: string) {
    return (
      !this.postForm.controls[field].valid &&
      this.postForm.controls[field].touched
    );
  }

  getErrorMessage(field: string) {
    var tempField =
      field.charAt(0).toUpperCase() + field.substring(1, field.length);
    if (this.postForm.controls[field].errors?.['required'])
      return tempField + ' is required';
    else if (this.postForm.controls[field].errors?.['minlength'])
      return (
        tempField +
        ' must be at least ' +
        this.postForm.controls[field].errors?.['minlength'].requiredLength +
        ' characters long.'
      );
    else if (this.postForm.controls[field].errors?.['maxlength'])
      return (
        tempField +
        ' can not exceed ' +
        this.postForm.controls[field].errors?.['maxlength'].requiredLength +
        ' characters.'
      );
    else if (this.postForm.controls[field].errors?.['email'])
      return tempField + ' is not valid.';
    else if (this.postForm.controls[field].errors?.['pattern'])
      return (
        tempField +
        ' should contain at least 8 character(Lowercase letters, Uppercase letters, Numbers, Special character).'
      );
    else return '';
  }
}

