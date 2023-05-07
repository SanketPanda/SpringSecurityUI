import {Component, Inject, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { commentDTO } from 'src/app/model/comment.model';
import { HttpServiceService } from 'src/app/service/http-service.service';
import { LoginService } from '../login/service/loginService.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'edit-comment-dialog',
  templateUrl: 'edit-comment.html',
})
export class EditCommentComponnet implements OnInit {
  public commentForm!: FormGroup;
  @Input() postId!: number;

  constructor(
    public dialogRef: MatDialogRef<EditCommentComponnet>,
    @Inject(MAT_DIALOG_DATA) public data: commentDTO,
    private httpService: HttpServiceService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      commentId: new FormControl(this.data.commentId),
      commentDescription: new FormControl(this.data.commentDescription, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
    });
  }

  onCommentUpdate() {
    if(!this.commentForm.controls['commentDescription'].valid){
      Swal.fire('Failure', 'Comment description should be at least 1 character long.', 'error');
      return;
    }
    const commentDTO: any = this.commentForm.value as commentDTO;
    commentDTO.email = this.loginService.getLoggedInUserEmail();
    commentDTO.postId = this.data.postId;
    this.httpService.put(environment.updateComment, commentDTO).subscribe(
      (data: commentDTO) => {
        this.commentForm.reset();
        this.dialogRef.close('comment updated');
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
