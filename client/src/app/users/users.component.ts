import { UsersState } from './users.state';
import { Observable } from 'rxjs/Observable';
import { Store } from "@ngrx/store";
import { AppState } from './../app.state';
import { Component, OnInit } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'users',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.css'],
    animations: [
        trigger('activeUserState', [
            state('true', style({
                color: 'lime'
            })),
            state('false', style({
                color: 'black'
            })),       
            transition('false => true', animate('1200ms ease-in')),
            transition('true => false', animate('280ms ease-out'))
        ])
    ]
})

export class UsersComponent implements OnInit {

    public users$: Observable<UsersState>;
    public activeUser$: Observable<string>;

    constructor(private store: Store<AppState>) {
        this.users$ = this.store.select(s => s.users);
        this.activeUser$ = this.store.select(s => s.counter).map(counter => counter.lastChangeBy);
    }

    ngOnInit() { }
}