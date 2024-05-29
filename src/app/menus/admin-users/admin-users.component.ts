import { Component, OnInit } from '@angular/core';
import { FirebaseApiService } from 'src/app/networking/firebase-api.service';
import { User } from '../../models/user.interface';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  users: Array<User> = [];
  selectedUser: Subject<any> = new Subject();
  userRefresh: Subject<any>;
  constructor(private apiService: FirebaseApiService, private router: Router) {
    this.userRefresh = apiService.getUserRefreshSubject();
  }

  ngOnInit(): void {
    this.userRefresh.subscribe(() => {
      this.apiService.getUsers().subscribe(
        (users) => {
          this.users = [];
          for (let id in users) {
            this.users.push({ ...users[id], ID: id });
          }
        },
        (err) => {
          this.router.navigate(['no-internet']);
          console.log(err);
        }
      );
    });

    this.userRefresh.next();
  }
  userSelected(user: User) {
    this.selectedUser.next(user);
  }
}
