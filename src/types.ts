export interface Schema {
    testProxies?: boolean;
    testTimeout?: number;
    testTarget?: string;
    datasetName?: string;
    kvStoreName?: string;
    pushToKvStore?: boolean;
}

export interface ProxySchema {
    host: string | null;
    port: number | null;
    full: string | null;
}

export type State = object | any;

export type GetStateFunction = () => State;

export type SetStateFunctionCallBack = (previous: State | undefined) => State;

export type SetStateFunction = (a: State | SetStateFunctionCallBack) => void;

export type StateWithProxies = { proxies: ProxySchema[] };
