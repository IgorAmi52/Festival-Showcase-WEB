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
  data: Array<Organisation> = [];
  constructor(private ApiService: FirebaseApiService, private router: Router) {}

  ngOnInit(): void {
    this.ApiService.getOrganisations().subscribe(
      (organisations) => {
        for (let id in organisations) {
          const organisation = { ...organisations[id], ID: id };
          this.data.push(organisation);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  orgSelected(selectedFestsID: String, selectedOrgName) {
    this.router.navigate(['organisation', selectedOrgName, selectedFestsID]);
  }
}
