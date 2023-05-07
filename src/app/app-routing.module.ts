import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProfileComponent } from './component/profile/profile.component';
import { IdentifyUserComponent } from './component/identify-user/identify-user.component';
import { AuthGuard } from './helper/auth-guard';
import { UserListComponent } from './component/user-list/user-list.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { PostComponent } from './component/post/post.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'post', component: PostComponent, canActivate: [AuthGuard]},
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard], data: {userId: ''}},
  { path: '', component: DashboardComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'identify-user', component: IdentifyUserComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'forget-password', component: ForgetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
