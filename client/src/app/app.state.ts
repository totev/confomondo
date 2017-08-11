import { UsersState } from './users/users.state';
import { UserState } from './user/user.state';
import { CounterState } from './counter/counter.state';

export interface AppState {
    counter: CounterState,
    user: UserState,
    users: UsersState
}