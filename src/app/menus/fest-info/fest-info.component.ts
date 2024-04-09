import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Festival } from 'src/app/models/festival.interface';
import { FirebaseApiService } from 'src/app/networking/firebase-api.service';

@Component({
  selector: 'app-fest-info',
  templateUrl: './fest-info.component.html',
  styleUrls: ['./fest-info.component.css'],
})
export class FestInfoComponent implements OnInit {
  fest: Festival = {
    ID: undefined,
    naziv: undefined,
    opis: undefined,
    slike: [],
    tip: undefined,
    prevoz: undefined,
    cena: undefined,
    maxOsoba: undefined,
  };

  constructor(
    private ApiService: FirebaseApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let orgID = this.route.snapshot.params['orgID'];
    let festID = this.route.snapshot.params['id'];
    this.ApiService.getFestival(orgID, festID).subscribe(
      (festData) => {
        this.fest = { ...festData, id: festID };
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
