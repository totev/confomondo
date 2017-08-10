export interface UserState {
    authenticated: boolean;
    connected: boolean;
    name: string;
}

export const initialUserState: UserState = {
    authenticated: false,
    connected: false,
    name: null
};