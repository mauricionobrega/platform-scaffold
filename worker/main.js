/* global PROJECT_SLUG, DEBUG */
/* eslint-env worker, serviceworker */

import toolbox from 'sw-toolbox'

// Just in case we end up overriding this later via a custom strategy
const successResponses = toolbox.options.successResponses

const cachebreaker = /b=([^&]+)/.exec(self.location.search)[1]
const CAPTURING_URL = 'https://cdn.mobify.com/capturejs/capture-latest.min.js'

const version = '0.1.2'
// For offline mode this needs to store the main.js, main.css, loader,
// and capturing in the bundle cache. For now we can't due to CORS limitations
const precacheUrls = [
    // `https://localhost:8443/main.css?${cachebreaker}`,
    // `https://localhost:8443/main.js?${cachebreaker}`
]

const baseCacheName = `${PROJECT_SLUG}-v${version}`
toolbox.options.cache.name = baseCacheName
toolbox.options.cache.maxAgeSeconds = 86400
toolbox.options.debug = DEBUG

// No cache maintenance options here on purpose, this is a permanent cache
const bundleCache = {
    name: `${baseCacheName}-bundle-${cachebreaker}`
}

const imageCache = {
    name: `${baseCacheName}-images`,
    maxEntries: 40
}

const cacheNames = [baseCacheName, bundleCache.name, imageCache.name]

toolbox.precache(precacheUrls)

// Lifecycle Handlers

self.addEventListener('install', (e) => {
    e.waitUntil(
        self.skipWaiting()
            .then(() => console.log('[ServiceWorker] Installed version', version))
    )
})

self.addEventListener('activate', (e) => {
    e.waitUntil(
        self.clients.claim()
            .then(() => caches.keys())
            .then((cacheKeys) => cacheKeys.filter(
                (key) => cacheNames.indexOf(key) === -1 && !key.endsWith('$$$inactive$$$')))
            .then((keysToDelete) => keysToDelete.map((key) => caches.delete(key)))
            .then((promises) => Promise.all(promises))
    )
})

// Path Handlers
toolbox.router.get(/\.(?:png|gif|svg|jpe?g)$/, toolbox.fastest, {cache: imageCache})

// Bundle contents
toolbox.router.get(/cdn\.mobify\.com\/.*\?[a-f\d]+$/, toolbox.cacheFirst, {cache: bundleCache})
toolbox.router.get(/localhost:8443.*\?[a-f\d]+$/, toolbox.networkFirst, {cache: bundleCache})
// Keep the preview response around for offline in preview mode
toolbox.router.get(/https:\/\/preview.mobify.com\/v7/, toolbox.networkFirst, {cache: bundleCache})

// Necessary Mobify scripts
toolbox.router.get(new RegExp(`^${CAPTURING_URL}$`), toolbox.networkFirst, {cache: bundleCache})
toolbox.router.get(/(?:cdn\.mobify\.com|localhost:8443)\/.*loader\.js$/, toolbox.networkFirst, {cache: bundleCache})

// Google fonts
toolbox.router.get(/fonts.gstatic.com\/.*\.woff2$/, toolbox.cacheFirst, {cache: bundleCache})
toolbox.router.get(/fonts.googleapis.com\/css/, toolbox.networkFirst, {cache: bundleCache})

/**
 * Makes a fetch for the given request, and caches it in the given cacheName cache
 * Resolves on a successful fetch, and rejects if there is a network error or a
 * non-success response status code (i.e. 403, 404, etc.)
 *
 * @param {Request} request - Request object (like that provided by a `fetch`
 * event listener or as the first argument from `toolbox.router.get`)
 * @param {string} cacheName - The name of the cache to store the request/response in
 * @returns {Promise}
 */
const fetchAndCache = (request, cacheName) => {
    return new Promise((resolve, reject) => {
        fetch(request.clone())
            .then((response) => {
                // This is lifted from https://github.com/GoogleChrome/sw-toolbox/blob/master/lib/strategies/networkFirst.js#L59
                if (successResponses.test(response.status)) {
                    caches.open(cacheName).then((cache) => {
                        cache.put(request, response)
                    })

                    resolve(response.clone())
                } else {
                    toolbox.options.debug && console.error(`Response was an HTTP error: ${response.statusText}`)
                    reject(['Bad response', request, response])
                }
            })
            // This should happen if there's a network failure
            .catch((error) => {
                toolbox.options.debug && console.error(error)
                reject([error, request])
            })
    })
}

/**
 * Provides a response from the cache if the network failed to retrieve it, with
 * a custom header for use by the application
 *
 * Expects to be used when catching rejection/error from `fetchAndCache`. Throws
 * the provided error message if there was a network failure and no cache hit
 * was found.
 *
 * @param {Error} error - The error object provided by fetch
 * @param {Request} request - the Request from the fetch the worker is proxying
 * @param {Response} response - the Response for the given Request
 * @param {string} cacheName - the name of the cache to look for the Request in
 * @param {Promise}
 */
const cacheFallback = (error, request, response, cacheName) => {
    toolbox.options.debug && console.error(`Network or response error, fallback to cache [${request.url}]`)

    /* eslint-disable max-nested-callbacks */
    return caches.open(cacheName).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                const newOptions = {
                    status: 200,
                    statusText: 'OK',
                    // Add the original headers from the response to our
                    // new response
                    headers: Object.assign({}, cachedResponse.headers, {
                        // We look for this in the application to determine if
                        // we're offline
                        'x-mobify-progressive': 'offline'
                    })
                }

                return cachedResponse.blob().then((responseBodyAsBlob) => {
                    return new Response(responseBodyAsBlob, newOptions)
                })
            }

            // In the case of a non-cached HTTP error, we still have a response,
            // so pass it down to the application
            if (response) {
                return response
            }

            // This should happen if there was a network failure and no cache hit
            throw error
        })
    })
    /* eslint-enable max-nested-callbacks */
}

/**
 * It's unfortunate that the toolbox doesn't provide a way to add on custom response
 * headers, because that's all we need this for. This isn't as robust as their networkFirst
 * strategy.
 *
 * Basically, we fetch and cache - if it fails we try the cache, but add a
 * `x-mobify-progressive: offline` header for use by the application
 */
const customNetworkFirst = function(request) {
    // `this` is the `Route` object passed to by `toolbox.router.get`
    const cacheName = this.options.cache.name

    return fetchAndCache(request, cacheName)
        .catch(([error, originalRequest, originalResponse]) => cacheFallback(error, originalRequest, originalResponse, cacheName))
}

// Main page is needed for installed app when offline
toolbox.router.get('/', customNetworkFirst, {
    cache: bundleCache
})

// Cache all other requests that aren't already matched by previous handlers
toolbox.router.get(/.*/, customNetworkFirst, {
    cache: toolbox.options.cache
})
