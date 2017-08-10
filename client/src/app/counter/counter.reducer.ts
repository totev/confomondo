import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CounterActions, CounterActionTypes } from './counter.actions';
import { initialCounterState, CounterState } from './counter.state';

export function counterReducer(state = initialCounterState, action: CounterActions): CounterState {
    switch (action.type) {

        case CounterActionTypes.INCREMENT:
            return Object.assign({}, state, {
                total: state.total + 1
            });

        case CounterActionTypes.DECREMENT:
            return Object.assign({}, state, {
                total: state.total - 1
            });

        case CounterActionTypes.RESET:
            if (action.payload) {
                return Object.assign({}, state, {
                    total: action.payload
                });
            } else {
                return initialCounterState;
            }
        default: {
            return state;
        }
    }
}
