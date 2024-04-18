import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organisation } from 'src/app/models/organisation.interface';
import { FirebaseApiService } from 'src/app/networking/firebase-api.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainMenuComponent implements OnInit {
  orgs: Array<Organisation> = [];
  filteredOrgs: Array<Organisation> = [];
  filter: string = '';
  constructor(private apiService: FirebaseApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getOrganisations().subscribe(
      (organisations) => {
        for (let id in organisations) {
          const organisation = { ...organisations[id], ID: id };
          this.orgs.push(organisation);
        }
        this.filteredOrgs = [...this.orgs];
      },
      (err) => {
        this.router.navigate(['no-internet']);
        console.log(err);
      }
    );
  }
  orgSelected(selectedOrgID: String) {
    this.router.navigate(['organisation', selectedOrgID]);
  }
  filterOrgs() {
    let filteredArr = [];

    for (let i = 0; i < this.orgs.length; i++) {
      if (
        this.orgs[i].naziv.toUpperCase().includes(this.filter.toUpperCase())
      ) {
        filteredArr.push(this.orgs[i]);
      }
    }
    this.filteredOrgs = [...filteredArr];
  }
}
