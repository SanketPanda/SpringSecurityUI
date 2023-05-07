import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { commentDTO } from 'src/app/model/comment.model';
import { postDTO } from 'src/app/model/post.model';
import { HttpServiceService } from 'src/app/service/http-service.service';
import { LoginService } from '../login/service/loginService.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCommentComponnet } from './edit-component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() comments!: commentDTO[];
  @Output() onComentListUpdate = new EventEmitter<any>();

  constructor(
    private httpService: HttpServiceService,
    public dialog: MatDialog,
    private router: Router,
  ) {
  }

  editComment(editComment: commentDTO){
    this.openDialog(editComment);
  }

  deleteComment(deleteComment: commentDTO){
    Swal.fire({
        title: 'Are you sure you want to delete this comment?',
        text: deleteComment.commentDescription,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'yes!',
        cancelButtonText: 'no'
  }).then((result) => {
      if (result.value) {
        this.httpService.delete(environment.deleteComment, deleteComment).subscribe(
          (data: Array<postDTO>) => {
            this.onComentListUpdate.emit();
            Swal.fire("success", "Your comment deleted successfully!", "success")
          }
        );
      } else if(result.dismiss == Swal.DismissReason.cancel){

      }
  })
  }

  openDialog(editComment: commentDTO): void {
    const dialogRef = this.dialog.open(EditCommentComponnet, {
      data: editComment,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;
      this.onComentListUpdate.emit();
    });
  }

  showUserProfile(userId: any){
    this.router.navigateByUrl(`/user-profile/${userId}`, { state: { userId: userId } });
  }
}
