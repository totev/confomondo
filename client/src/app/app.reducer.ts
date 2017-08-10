import { AppState } from './app.state';
import { ActionReducerMap, ActionReducer, State } from '@ngrx/store';
import { environment } from '../environments/environment';
import { counterReducer } from './counter/counter.reducer';
import { userReducer } from './user';


export const reducers: ActionReducerMap<AppState> = {
    counter: counterReducer,
    user: userReducer
};


// console.log all actions
export function logger(reducer: ActionReducer<AppState>): ActionReducer<any, any> {
  return function(state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: ActionReducer<any, any>[] = !environment.production
  ? [logger]
  : [];