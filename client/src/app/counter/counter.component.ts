import { AppState } from './../app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { CounterState } from '../counter/counter.state';
import * as CounterActions from '../counter/counter.actions';


@Component({
    selector: 'counter',
    templateUrl: 'counter.component.html',
    styleUrls: ['counter.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CounterComponent {
    counter$: Observable<CounterState>;

    constructor(private store: Store<AppState>) {
        this.counter$ = store.select(s => s.counter);
    }


    increment() {
        this.store.dispatch(new CounterActions.IncrementAction());
    }

    decrement() {
        this.store.dispatch(new CounterActions.DecrementAction());
    }

    reset() {
        this.store.dispatch(new CounterActions.ResetAction());
    }


}