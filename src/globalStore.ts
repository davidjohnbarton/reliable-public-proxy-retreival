import Apify, { utils } from 'apify';
import { State, SetStateFunctionCallBack } from './types';

class GlobalStore {
    state: State;

    constructor() {
        this.state = {};

        Apify.events.on('persistState', () => {
            utils.log.info('Persisting global store...');
            return Apify.setValue('GLOBAL-STORE', this.state);
        });

        Apify.events.on('migrating', () => {
            return Apify.setValue('GLOBAL-STORE', this.state);
        });
    }

    async initialize(): Promise<void> {
        const data = await Apify.getValue('GLOBAL-STORE');
        if (!!data) this.state = data as State;
        if (!data) this.state = {};
    }

    getState() {
        return this.state as State;
    }

    setState(setStateParam: State | SetStateFunctionCallBack) {
        if (typeof setStateParam === 'object') {
            this.state = setStateParam;
            return;
        }

        const newState = { ...this.state, ...setStateParam(this.state) };
        this.state = newState;
    }
}

export default GlobalStore;
