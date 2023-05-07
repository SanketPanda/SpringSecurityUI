import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/header/header.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FieldErrorComponent } from './component/field-error/field-error.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { BasicAuthInterceptorService } from './service/basic-auth-interceptor.service';
import { ProfileComponent } from './component/profile/profile.component';
import { IdentifyUserComponent } from './component/identify-user/identify-user.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { AuthGuard } from './helper/auth-guard';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { GlobalErrorHandlerService } from './service/GlobalErrorHandlerService.service';
import { PostComponent } from './component/post/post.component';
import { LeftNavComponent } from './component/left-nav/left-nav.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { AddPostComponent } from './component/add-post/add-post.component';
import { AddCommentComponent } from './component/add-comment/add-comment.component';
import {MatMenuModule} from '@angular/material/menu';
import { CommentComponent } from './component/comment/comment.component';
import { EditCommentComponnet } from './component/comment/edit-component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    FieldErrorComponent,
    DashboardComponent,
    ProfileComponent,
    IdentifyUserComponent,
    UserListComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    PostComponent,
    LeftNavComponent,
    UserProfileComponent,
    AddPostComponent,
    AddCommentComponent,
    CommentComponent,
    EditCommentComponnet,
    DateAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptorService, multi: true },
    // { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
