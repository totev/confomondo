import {Action} from '@ngrx/store';
import {RemoteAction} from "../shared/remote-action.model";

const COUNTER_ACTIONS_EVENT_BUS_ADDRESS: string = 'service.counter.actions';

export const CounterActionTypes = {
    INCREMENT: '[Counter] Increment',
    DECREMENT: '[Counter] Decrement',
    RESET: '[Counter] Reset'
};

export class IncrementAction extends RemoteAction {
    type = CounterActionTypes.INCREMENT;
    constructor() {
        super(COUNTER_ACTIONS_EVENT_BUS_ADDRESS);
    }
}

export class DecrementAction extends RemoteAction {
    type = CounterActionTypes.DECREMENT;
    constructor() {
        super(COUNTER_ACTIONS_EVENT_BUS_ADDRESS);
    }
}

export class ResetAction extends RemoteAction {
    type = CounterActionTypes.RESET;
    constructor() {
        super(COUNTER_ACTIONS_EVENT_BUS_ADDRESS);
    }
}

export type CounterActions =
    IncrementAction
    | DecrementAction
    | ResetAction;
