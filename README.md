# Proxy Scraper

## What is Proxy Scraper?

This very simple and performant actor scours various different free-proxy websites and scrapes all of them. Then, optionally, it can test each of those proxies for you on a specified target and timeout, then only return back the proxies which pass the test.

## Input

| Name          | Type    | Description                                                                                                                                                                                                                                                                     |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| testProxies   | boolean | Whether or not to run tests on each proxy. The tests are quite fast.                                                                                                                                                                                                            |
| testTarget    | string  | The website you'd like to test the proxies on. This can affect output. Default "https://google.com"                                                                                                                                                                             |
| testTimeout   | number  | Timeout for every single test request in seconds. Default 15, max 30                                                                                                                                                                                                           |
| datasetName   | string  | An optional custom name for the actor's dataset. Learn more about named storages [here](https://docs.apify.com/storage#named-and-unnamed-storages). If a custom dataset name is provided, the data from the actor will be pushed into the named one instead of its default one. |
| kvStoreName   | string  | An optional custom name for the actor's key-value-store (only has an effect if pushToKvStore is set to true)                                                                                                                                                                    |
| pushToKvStore | boolean | The option to push JSON and .TXT formatted proxies list to a named key-value-store. If kvStoreName is not set, the default name will be `free-proxy-store`                                                                                                                      |

Example:

```JSON
{
    "testProxies": true,
    "testTimeout": 7,
    "testTarget": "https://google.com",
    "kvStoreName": "reliable-proxies-store",
    "pushToKvStore": true,
    "datasetName": "test-dataset"
}
```

## Output

The output will be an array of objects looking like this:

```JSON
{
  "host": "164.27.6.74", // string
  "port": 8080, // number
  "full": "164.27.6.74:8080" // string
}
```

## What's happening under the hood?

1. All of the current proxies from these free proxy resources are added to the request queue (with certain filters applied):

-   https://free-proxy-list.net/
-   https://www.sslproxies.org/
-   https://www.us-proxy.org/
-   https://www.socks-proxy.net/
-   https://proxylist.geonode.com
-   https://geonode.com/free-proxy-list/
-   https://spys.one/en/
-   https://vpnoverview.com/privacy/anonymous-browsing/free-proxy-servers/
-   https://hidemy.name/en/proxy-list/
-   https://www.proxynova.com/proxy-server-list/
-   https://free-proxy-list.com/
-   https://anonymouse.cz/proxy-list/
-   https://www.coderduck.com/free-proxy-list
-   https://www.proxyrack.com/free-proxy-list/
-   https://www.proxy-list.download
-   https://www.proxyscan.io/
-   http://pubproxy.com

2. Each site is scraped, and the results are stored temporarily in a global state

3. Each scraped proxy is tested by making a request to a target URL specified by you with a specific timeout set. If the request fails, the proxy is removed from the list.

4. All duplicate results are cleaned from the list.

5. The proxies are finally pushed to the dataset.
