import { AxiosInstance, AxiosProxyConfig } from 'axios';
import { CheerioAPI } from 'cheerio';
import { color } from 'console-log-colors';
const { red, cyan, green, yellow, blueBright } = color;

import GlobalStore from './globalStore';
import { ProxySchema, StateWithProxies } from './types';

export const proxyLog = {
    test: {
        success: (str: string) => console.log(cyan('[PROXY TESTS]'), green(str)),
        failure: (str: string) => console.log(cyan('[PROXY TESTS]'), red(str)),
    },
    log: (str: string) => console.log(cyan('[PROXY SCRAPER]'), str),
    warn: (str: string) => console.log(cyan('[PROXY SCRAPER]'), yellow(str)),
    storages: (str: string) => console.log(blueBright('[STORAGES]'), str),
};

export const getProxiesFromTable = ($: CheerioAPI, tableRowSelector: string, hostPosition = 0, portPosition = 1): Array<ProxySchema> => {
    const prx: ProxySchema[] = [];

    $(tableRowSelector).each((_, tr) => {
        let host: string | null = null;
        let port: string | null = null;
        let full: string | null = null;

        const tds = $(tr).find('td');

        tds.each((i, td) => {
            if (i > 1) full = `${host}:${port}`;
            if (i === hostPosition) host = $(td).text().trim();
            if (i === portPosition) port = $(td).text().trim();
        });

        prx.push({
            host,
            port: port ? +port : port,
            full,
        });
    });

    return prx;
};

export const getProxiesFromSneakyTable = ($: CheerioAPI, tableRowSelector: string): Array<ProxySchema> => {
    const prx: ProxySchema[] = [];

    $(tableRowSelector).each((_, tr) => {
        let host: string | null = null;
        let port: string | null = null;
        let full: string | null = null;

        const tds = $(tr).find('td');

        tds.each((i, td) => {
            if (i === 0) {
                const scriptTag = $(td).find('abbr > script').html() as string;
                host = !!scriptTag ? scriptTag.replace(/document.write|'|\+|\)|\(|\s|;/g, '') : null;
            }
            if (i === 1) port = $(td).text().trim();
            if (i > 1) full = `${host}:${port}`;
        });

        prx.push({
            host,
            port: port ? +port : port,
            full,
        });
    });

    return prx;
};

export const addProxiesToStore = (store: GlobalStore, proxiesToAdd: ProxySchema[]): void => {
    proxyLog.log(`Pushing ${proxiesToAdd.length} proxies to global store.`);
    store.setState((prev: StateWithProxies) => {
        return {
            ...prev,
            proxies: [...prev?.proxies, ...proxiesToAdd],
        };
    });
};

export const testProxy = async (instance: AxiosInstance, target: string, proxyObj: ProxySchema, https?: boolean) => {
    try {
        const { host, port } = proxyObj as { host: string; port: number };

        const proxyOptions: AxiosProxyConfig = {
            host,
            port,
        };

        if (https) proxyOptions.protocol = 'https';

        const { data, status } = await instance.get(target, {
            proxy: proxyOptions,
        });

        return status === 200 && data ? true : false;
    } catch (error) {
        return false;
    }
};
