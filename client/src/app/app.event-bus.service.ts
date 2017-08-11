import { UsersState } from './users/users.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

import { AppState } from './app.state';
import * as CounterActions from './counter/counter.actions';
import * as UserActions from "./user/user.actions";
import * as UsersActions from './users/users.actions';
import { EventBusService } from './shared/event-bus.service';
import { RemoteAction } from "./shared/remote-action.model";
import { environment } from "../environments/environment";
import { EventBusConstants } from "./shared/event-bus.constants";

@Injectable()
export class AppEventBusService {

    private currentUser: string;

    constructor(
        private eventBusService: EventBusService,
        private store: Store<AppState>) {

        this.store.select(s => {
            return s.user.name
        })
            //.distinctUntilChanged()
            .subscribe(name => this.currentUser = name);
    }

    get connected(): boolean {
        return this.eventBusService.connected;
    }

    get enabled(): boolean {
        return environment.eventBusURL && environment.eventBusURL !== '';
    }

    connect() {
        if (!this.enabled) {
            console.debug("AppEventBusService.connect - Disabled ");
        }

        // Subscribe to close event
        this.eventBusService.close.subscribe(() => {
            this.store.dispatch(new UserActions.ConnectionClosedAction());
        });

        // Subscribe to open event
        this.eventBusService.open.subscribe(() => {
            console.debug('AppEventBusService.open');
            this.subscribeToActions(EventBusConstants.COUNTER_ACTIONS_EVENT_BUS_ADDRESS);
            // subscribe to the users eventbus
            this.subscribeToActions(EventBusConstants.COUNTER_USERS_EVENT_BUS_ADDRESS);

            this.initializeCounter();
            this.serverJoin();
            this.synchronizeUsers();
            this.store.dispatch(new UserActions.ConnectionOpenedAction());
        });


        // Connect
        console.debug("AppEventBusService.connect " + environment.eventBusURL);
        this.eventBusService.connect(environment.eventBusURL, this.buildHeaders());
    }

    disconnect() {
        this.eventBusService.disconnect();
    }


    /**
     *
     */
    initializeCounter() {
        if (!this.enabled) return;
        if (this.connected) {
            let body: any = {};
            this.eventBusService.send('service.counter.total', body, (error, message) => {
                if (message && message.body) {
                    let localAction = new CounterActions.ResetAction();
                    localAction.payload = message.body;
                    this.store.dispatch(localAction);
                }
                if (error) {
                    console.error(error);
                }
            });
        }
    }


    /** 
     * Notify the listeners of the user's sign in
     */
    serverJoin() {
        const joinAction = new UsersActions.JoinAction(this.currentUser);
        this.publishAction(joinAction);
    }

    synchronizeUsers(): void {
        if (!this.enabled) return;
        if (this.connected) {
            const userSync = new UsersActions.SyncAction();
            this.eventBusService.send(EventBusConstants.COUNTER_USERS_SYNC_EVENT_BUS_ADDRESS, userSync, (error, message) => {
                if (message && message.body) {

                    this.store.dispatch(<any>message.body);
                }
                if (error) {
                    console.error(error);
                }
            });
        }
    }

    /**
     *
     * @param action
     */
    publishAction(action: RemoteAction) {
        if (!this.enabled) return;
        if (action.publishedByUser) {
            console.error("This action has already been published", action);
            return;
        }
        action.publishedByUser = this.currentUser;
        this.eventBusService.publish(action.eventBusAddress, action);
    }

    /**
     *
     * @param eventBusAddress
     */
    subscribeToActions(eventBusAddress: string) {
        if (!this.enabled) return;
        this.eventBusService.registerHandler(eventBusAddress, (error, message) => {
            if (error) {
                console.error('AppEventBusService.handleAction error', error);
                return;
            }
            if (!message.body) {
                console.error('AppEventBusService.handleAction - body is required in message', message);
                return;
            }
            if (message.body.publishedByUser === this.currentUser) {
                // Ignore action sent by current manager
                return;
            }
            const remoteAction = message.body;
            this.store.dispatch(remoteAction);
        });
    }

    /**
     *
     * @param eventBusAddress
     */
    unsubscribeFromActions(eventBusAddress: string) {
        if (!this.enabled) return;
        this.eventBusService.unregister(eventBusAddress);
    }

    // PRIVATE

    private buildHeaders() {
        // TODO Authentication header
        return {
            currentUser: this.currentUser
        };
    }

}
