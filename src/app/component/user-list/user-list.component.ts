import { Component } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { registerUserDTO } from 'src/app/model/register.model';
import { HttpServiceService } from 'src/app/service/http-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: registerUserDTO[] = [];

  constructor(
    private httpService: HttpServiceService
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
}
