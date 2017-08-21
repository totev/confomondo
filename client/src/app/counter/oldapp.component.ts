import { CounterState } from './counter.state';
import { UserState } from '../user/user.state';
import { AppState } from '../app.state';
import { Component } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import * as UserActions from '../user/user.actions';

@Component({
	selector: 'old-app-root',
	templateUrl: './oldapp.component.html',
	styleUrls: ['./oldapp.component.css']
})
export class OldAppComponent {
	user$: Observable<UserState>;

	

	constructor(private store: Store<AppState>) {
		this.user$ = this.store.select(s => s.user);
	}

	// user based actions
	login(userName) {
		this.store.dispatch(new UserActions.LoginAction(userName));
	}

}
