import { UsersState } from './users.state';
import { Observable } from 'rxjs/Observable';
import { Store } from "@ngrx/store";
import { AppState } from './../app.state';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'users',
    templateUrl: 'users.component.html'
})

export class UsersComponent implements OnInit {

    public users$: Observable<UsersState>;

    constructor(private store: Store<AppState>) {
        this.users$ = this.store.select(s => s.users);
    }

    ngOnInit() { }
}