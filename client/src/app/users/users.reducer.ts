import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UsersActions, UsersActionTypes } from './users.actions';
import { initialUsersState, UsersState } from './users.state';

export function usersReducer(state = initialUsersState, action: UsersActions): UsersState {
    switch (action.type) {

        case UsersActionTypes.SYNC:
        console.debug('got: ', action);
            return Object.assign({}, state, {
                names: action.payload
            });

        case UsersActionTypes.JOIN:
            return Object.assign({}, state, {
                names: [...state.names, action.payload]
            });

        default: {
            return state;
        }
    }
}
