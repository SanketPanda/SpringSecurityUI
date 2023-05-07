import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { postDTO } from 'src/app/model/post.model';
import { HttpServiceService } from 'src/app/service/http-service.service';
import { LoginService } from '../login/service/loginService.service';
import { environment } from 'src/app/environments/environment';
import { commentDTO } from 'src/app/model/comment.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  posts: postDTO[] = [];

  constructor(
    private router: Router,
    private httpService: HttpServiceService,
    private loginService: LoginService
  ) {
    this.updatePostList("");
  }

  ngOnInit(): void {

  }

  updatePostList($event: any){
    const email = this.loginService.getLoggedInUserEmail();
    this.httpService.get(environment.getAllPost).subscribe(
      (data: Array<postDTO>) => {
        this.posts = data;
      }
    );
  }

  editPost(post: postDTO){

  }

  deletePost(post: postDTO){
    this.httpService.delete(environment.deleteComment, post).subscribe(
      (data: Array<postDTO>) => {
        this.updatePostList('');
      }
    );
  }

  showUserProfile(userId: any){
    this.router.navigateByUrl(`/user-profile/${userId}`, { state: { userId: userId } });
  }

}
