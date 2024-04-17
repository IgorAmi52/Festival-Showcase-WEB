import { Component, OnInit } from '@angular/core';
import { FirebaseApiService } from './networking/firebase-api.service';
import { Organisation } from './models/organisation.interface';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loginEmmiter: Subject<any> = new Subject();
  registerEmmiter: Subject<any> = new Subject();
  loginEmmited() {
    this.loginEmmiter.next(1);
  }
  registerEmmited() {
    this.registerEmmiter.next(1);
  }
}
