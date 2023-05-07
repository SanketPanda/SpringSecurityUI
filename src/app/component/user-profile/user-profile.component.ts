import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { postDTO } from 'src/app/model/post.model';
import { registerUserDTO } from 'src/app/model/register.model';
import { HttpServiceService } from 'src/app/service/http-service.service';
import Swal from 'sweetalert2';
import { LoginService } from '../login/service/loginService.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  public userForm!: FormGroup;
  title!: string ;
  user!: string;
  private errorMsg!: string;
  private userId!: string;
  state$!: Observable<object>;
  posts: postDTO[] = [];



  constructor(
    private httpService: HttpServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  )
  {
    this.errorMsg = '';
  }

  ngOnInit(){
    this.userForm = new FormGroup({
      firstName: new FormControl(null,),
      lastName: new FormControl(null,),
      userId: new FormControl(null,)
    });
      this.setPageTitle();
  }

  setPageTitle(){
    this.state$ = this.route.paramMap
    .pipe(map(() => window.history.state));
    this.state$.subscribe((value: any)=> {
      if(value.userId){
      this.userId = value.userId;
      this.initializeFormValues(this.userId);
      this.updatePostList('userId');
    }else{
      Swal.fire('Failure', 'Url is broken', 'error').then((result)=>{
        if(result.value){
          this.router.navigate(['/dashboard']);
        }
      });
    }
  });
  }

  initializeFormValues(userId: string){
    this.httpService
      .get(environment.getUserById+userId)
      .subscribe((data: registerUserDTO) => {
        this.userForm.controls['firstName'].setValue(data.firstName);
        this.userForm.controls['lastName'].setValue(data.lastName);
        this.userForm.controls['userId'].setValue(data.userId);
      });
  }

  showUserProfile(email: string){
    this.router.navigateByUrl('/user-profile/'+this.userId, { state: { userId: this.userId } });
  }

  updatePostList($event: any){
    this.httpService.get(environment.getPostOfUser+this.userId).subscribe(
      (data: Array<postDTO>) => {
        this.posts = data;
      }
    );
  }
}
