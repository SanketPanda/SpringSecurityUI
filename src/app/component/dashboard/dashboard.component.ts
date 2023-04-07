import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { registerUserDTO } from 'src/app/model/register.model';
import { HttpServiceService } from 'src/app/service/http-service.service';
import { LoginService } from '../login/service/loginService.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  users: registerUserDTO[] = [];

  constructor(
    private httpService: HttpServiceService,
    private router: Router
  ) {
    this.refreshEmployeeList();
  }

  refreshEmployeeList() {
    this.httpService
      .get(environment.users+'/all')
      .subscribe((data: registerUserDTO[]) => {
        this.users = data;
        console.log(this.users);
      });
  }

  deleteEmployee(user: registerUserDTO) {
    console.log('deleting user ');
    console.log(user);
    const deleteData = {
      url: environment.users,
      conetent: user,
      childContent: []
    };
    // this.deleteHandler.openDialog(deleteData).subscribe(() => {
    //   console.log('refreh data after deleting');
    //   this.refreshEmployeeList();
    // });
  }

  editEmployee(user: registerUserDTO){
    //this.router.navigate(['/employee/create'], {state:employee});
  }
}
