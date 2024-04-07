import { Component, OnInit } from '@angular/core';
import { FirebaseApiService } from './networking/firebase-api.service';
import { Organisation } from './models/organisation.interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'WebDesignProject';
}
