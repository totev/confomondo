import { DemoStoreService } from '../../shared/demostore.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Conference } from "../conference";
import { BaseConferenceComponent } from "../base-conference.component";

@Component({
  selector: 'cfmdo-edit-conference',
  templateUrl: './edit-conference.component.html',
  styleUrls: ['./edit-conference.component.css']
})
export class EditConferenceComponent extends BaseConferenceComponent implements OnInit {


  constructor(route: ActivatedRoute, demoService: DemoStoreService) {
    super(route, demoService);
  }

  ngOnInit() {
    this.onRouterParamsUpdate();
  }

}
