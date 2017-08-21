import {Conference} from '../conference';
import { Component, OnInit } from '@angular/core';
import { DemoStoreService } from "../../shared/demostore.service";

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.css']
})
export class ConferencesComponent implements OnInit {

  public conferences: Conference[];

  constructor(public demoService: DemoStoreService) {
    this.conferences = demoService.generateConferences();
  }


  ngOnInit() {
    console.debug('started');
  }

}
