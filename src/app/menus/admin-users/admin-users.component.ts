import { Component, OnInit } from '@angular/core';
import { FirebaseApiService } from 'src/app/networking/firebase-api.service';
import { User } from '../../models/user.interface';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  users: Array<User> = [];
  selectedUser: Subject<any> = new Subject();

  constructor(private apiService: FirebaseApiService) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe(
      (users) => {
        for (let id in users) {
          this.users.push({ ...users[id], ID: id });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  userSelected(user: User) {
    this.selectedUser.next(user);
  }
}
