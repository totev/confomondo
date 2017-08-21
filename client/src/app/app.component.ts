import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

type Selected = 'dashboard' | 'conferences';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public selected: Selected;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(f => console.log('Router url: ', f));
  }

}
