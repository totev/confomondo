import { RemoteAction } from "../shared/remote-action.model";
import { EventBusConstants } from "../shared/event-bus.constants";

export const UsersActionTypes = {
    SYNC: '[Users] Synchronization',
    JOIN: '[Users] Join',
    EXIT: '[Users] Exit'
};

export class JoinAction extends RemoteAction {
    payload: string;
    type = UsersActionTypes.JOIN;

    constructor(userName: string) {
        super(EventBusConstants.COUNTER_USERS_EVENT_BUS_ADDRESS);
        this.payload = userName;
    }
}

export class ExitAction extends JoinAction {
    type = UsersActionTypes.EXIT;
}

export class SyncAction extends RemoteAction {
    type = UsersActionTypes.SYNC;

    constructor() {
        super(EventBusConstants.COUNTER_USERS_EVENT_BUS_ADDRESS);
    }
}

export type UsersActions = SyncAction;
