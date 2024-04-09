import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Festival } from 'src/app/models/festival.interface';

@Component({
  selector: 'app-fest-info',
  templateUrl: './fest-info.component.html',
  styleUrls: ['./fest-info.component.css'],
})
export class FestInfoComponent implements OnInit {
  fest: Festival;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fest = history.state.jsonData;
  }
}
