export interface CounterState {
    total: number;
    lastChangeBy: string;
}

export let initialCounterState: CounterState = {
    total: 0,
    lastChangeBy: undefined
};