import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from 'src/app/service/http-service.service';
import { LoginService } from '../login/service/loginService.service';
import { Router } from '@angular/router';
import { commentDTO } from 'src/app/model/comment.model';
import { environment } from 'src/app/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() postId!: number;
  @Output() onComentAdd = new EventEmitter<any>();
  public commentForm!: FormGroup;

  constructor(
    private httpService: HttpServiceService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      commentId: new FormControl(null),
      commentDescription: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
    });
  }

  onFormSubmit() {
    if(!this.commentForm.controls['commentDescription'].valid){
      Swal.fire('Failure', 'Comment description should be at least 1 character long.', 'error');
      return;
    }
    const commentDTO: any = this.commentForm.value as commentDTO;
    commentDTO.email = this.loginService.getLoggedInUserEmail();
    commentDTO.postId = this.postId;
    this.httpService.post(environment.addComment, commentDTO).subscribe(
      (data: commentDTO) => {
        this.commentForm.reset();
        this.onComentAdd.emit();
      }
    );
  }

  isFieldValid(field: string) {
    return (
      !this.commentForm.controls[field].valid &&
      this.commentForm.controls[field].touched
    );
  }

  getErrorMessage(field: string) {
    var tempField =
      field.charAt(0).toUpperCase() + field.substring(1, field.length);
    if (this.commentForm.controls[field].errors?.['required'])
      return tempField + ' is required';
    else if (this.commentForm.controls[field].errors?.['minlength'])
      return (
        tempField +
        ' must be at least ' +
        this.commentForm.controls[field].errors?.['minlength'].requiredLength +
        ' characters long.'
      );
    else if (this.commentForm.controls[field].errors?.['maxlength'])
      return (
        tempField +
        ' can not exceed ' +
        this.commentForm.controls[field].errors?.['maxlength'].requiredLength +
        ' characters.'
      );
    else if (this.commentForm.controls[field].errors?.['email'])
      return tempField + ' is not valid.';
    else if (this.commentForm.controls[field].errors?.['pattern'])
      return (
        tempField +
        ' should contain at least 8 character(Lowercase letters, Uppercase letters, Numbers, Special character).'
      );
    else return '';
  }
}
