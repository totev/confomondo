import { DemoStoreService } from '../shared/demostore.service';
import { ParamMap, ActivatedRoute } from '@angular/router';

import { Conference } from './conference';
import { Input } from "@angular/core";

export abstract class BaseConferenceComponent {
    @Input()
    public conference: Conference;

    constructor(protected route: ActivatedRoute, protected demoService: DemoStoreService) {

    }


    protected onRouterParamsUpdate() {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.demoService.getConferenceById(params.get('uuid')))
            .subscribe(conference => {
                if (conference) {
                    this.conference = conference;
                }
            });
    }


}