import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Organisation } from 'src/app/models/organisation.interface';
import { FirebaseApiService } from 'src/app/networking/firebase-api.service';

@Component({
  selector: 'app-admin-org',
  templateUrl: './admin-org.component.html',
  styleUrls: ['./admin-org.component.css'],
})
export class AdminOrgComponent implements OnInit {
  organisations: Array<Organisation> = [];
  selectedOrg: Subject<any> = new Subject();
  constructor(private apiService: FirebaseApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getOrganisations().subscribe(
      (organisations) => {
        for (let id in organisations) {
          const organisation = { ...organisations[id], ID: id };
          this.organisations.push(organisation);
        }
      },
      (err) => {
        console.log(err);
        this.router.navigate(['no-internet']);
      }
    );
  }
  orgSelected(organisation: Organisation) {
    this.selectedOrg.next(organisation);
  }
}
