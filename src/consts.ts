import { RequestOptions } from 'apify';

export enum LABELS {
    FREEPROXYLISTNET = 'FREEPROXYLISTNET',
    GEONODECOM = 'GEONODECOM',
    SPYSME = 'SPYSME',
    PROXYSCANIO = 'PROXYSCANIO',
    VPNOVERVIEW = 'VPNOVERVIEW',
    HIDEMYNAME = 'HIDEMYNAME',
    PROXYNOVA = 'PROXYNOVA',
    PROXYFINDER = 'PROXYFINDER',
    FREEPROXYLISTCOM = 'FREEPROXYLISTCOM',
    ANONYMOUSE = 'ANONYMOUSE',
    CODERDUCK = 'CODERDUCK',
    PUBPROXY = 'PUBPROXY',
    PROXYLISTDOWNLOAD = 'PROXYLISTDOWNLOAD',
}

export type Label = LABELS;

export const REQUESTS: RequestOptions[] = [
    {
        url: 'https://free-proxy-list.net/',
        userData: { label: LABELS.FREEPROXYLISTNET },
    },
    {
        url: 'https://free-proxy-list.net/anonymous-proxy.html',
        userData: { label: LABELS.FREEPROXYLISTNET },
    },
    {
        url: 'https://www.sslproxies.org/',
        userData: { label: LABELS.FREEPROXYLISTNET },
    },
    {
        url: 'https://www.us-proxy.org/',
        userData: { label: LABELS.FREEPROXYLISTNET },
    },
    {
        url: 'https://free-proxy-list.net/uk-proxy.html',
        userData: { label: LABELS.FREEPROXYLISTNET },
    },
    {
        url: 'https://www.socks-proxy.net/',
        userData: { label: LABELS.FREEPROXYLISTNET },
    },
    {
        url: 'https://proxylist.geonode.com/api/proxy-list?limit=1000&page=1&sort_by=lastChecked&sort_type=desc',
        userData: { label: LABELS.GEONODECOM },
    },
    {
        url: 'https://spys.me/proxy.txt',
        userData: { label: LABELS.SPYSME },
    },
    {
        url: 'https://vpnoverview.com/privacy/anonymous-browsing/free-proxy-servers/',
        userData: { label: LABELS.VPNOVERVIEW },
    },
    {
        url: 'https://hidemy.name/en/proxy-list/?maxtime=5000&anon=34#list',
        userData: { label: LABELS.HIDEMYNAME },
    },
    {
        url: 'https://www.proxynova.com/proxy-server-list/elite-proxies/',
        userData: { label: LABELS.PROXYNOVA },
    },
    {
        url: 'https://free-proxy-list.com/?page=&port=&up_time=50&search=Search',
        userData: { label: LABELS.FREEPROXYLISTCOM },
    },
    {
        url: 'https://anonymouse.cz/proxy-list/',
        userData: { label: LABELS.ANONYMOUSE },
    },
    {
        url: 'https://www.coderduck.com/free-proxy-list',
        userData: { label: LABELS.CODERDUCK },
    },
    {
        url: 'https://proxyfinder.proxyrack.com/proxies.json?perPage=15000&offset=0',
        userData: { label: LABELS.PROXYFINDER },
        headers: {
            Origin: 'https://www.proxyrack.com',
            'Content-Type': 'application/json',
            Referer: 'https://www.proxyrack.com',
            Host: 'proxyfinder.proxyrack.com',
        },
    },
    {
        url: 'https://www.proxy-list.download/api/v1/get?type=http&anon=elite&country=US',
        userData: { label: LABELS.PROXYLISTDOWNLOAD },
    },
];

export const prepareRequestList = () => {
    for (let i = 0; i < 50; i++) {
        REQUESTS.unshift({
            url: 'https://www.proxyscan.io/api/proxy?uptime=90&limit=10',
            userData: { label: LABELS.PROXYSCANIO },
            headers: {
                'Content-Type': 'application/json',
            },
            uniqueKey: `${i}-proxyscan`,
        });

        REQUESTS.push({
            url: 'http://pubproxy.com/api/proxy?limit=5',
            userData: { label: LABELS.PUBPROXY },
            uniqueKey: `${i}-pubproxy`,
        });
    }
};
