import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output()
  loginEmmiter = new EventEmitter();
  @Output()
  registerEmmiter = new EventEmitter();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  configUsers() {
    this.router.navigate(['admin', 'users']);
  }
  configOrg() {
    this.router.navigate(['admin', 'organisations']);
  }
  openLogin() {
    this.loginEmmiter.emit(1);
  }
  openRegister() {
    this.registerEmmiter.emit(1);
  }
}
