import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseApiService } from 'src/app/networking/firebase-api.service';
import { Festival } from '../../models/festival.interface';
@Component({
  selector: 'app-festivals',
  templateUrl: './festivals.component.html',
  styleUrls: ['./festivals.component.css'],
})
export class FestivalsComponent implements OnInit {
  festIDs: String;
  orgName: String;
  data: Array<Festival> = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ApiService: FirebaseApiService
  ) {}

  ngOnInit(): void {
    this.festIDs = this.route.snapshot.paramMap.get('id');
    this.orgName = this.route.snapshot.paramMap.get('name');
    this.ApiService.getFestivals(this.festIDs).subscribe(
      (festivals) => {
        for (let id in festivals) {
          const festival = { ...festivals[id], ID: id };
          this.data.push(festival);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  festSelected(festID: String, festName) {
    let json;

    this.data.forEach((element) => {
      if (element.ID == festID) {
        json = element;
      }
    });

    this.router.navigate(['festival', festName], { state: { jsonData: json } });
  }
}
