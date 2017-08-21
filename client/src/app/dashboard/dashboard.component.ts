import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Conference } from "../conference/conference";
import { DemoStoreService } from "../shared/demostore.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public randomConfs$: Observable<Conference[]>;

  constructor(private demoStore:DemoStoreService) { }

  ngOnInit() {
    this.randomConfs$ = this.demoStore.getRandomConferences();
  }

}