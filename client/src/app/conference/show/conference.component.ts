import { Component, OnInit, Input } from '@angular/core';
import { DemoStoreService } from "../../shared/demostore.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { Conference } from "../conference";
import { BaseConferenceComponent } from "../base-conference.component";


@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent extends BaseConferenceComponent implements OnInit {

  @Input()
  public canNavigate: boolean = true;

  constructor(route: ActivatedRoute, private location: Location, demoService: DemoStoreService) {
    super(route, demoService);
  }


  ngOnInit() {
    this.onRouterParamsUpdate();
  }

  goBack(): void {
    this.location.back();
  }

}
