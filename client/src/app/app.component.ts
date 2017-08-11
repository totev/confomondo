import { CounterState } from './counter/counter.state';
import { UserState } from './user/user.state';
import { AppState } from './app.state';
import { Component } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as UserActions from './user/user.actions';
import * as CounterActions from './counter/counter.actions';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	counter$: Observable<CounterState>;
	user$: Observable<UserState>;


	constructor(private store: Store<AppState>) {
		this.user$ = this.store.select(s => s.user);
		this.counter$ = this.store.select(s => s.counter);
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


	// user based actions
	login(userName) {
		this.store.dispatch(new UserActions.LoginAction(userName));
	}

}
