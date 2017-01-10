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

// Main page is needed for installed app when offline
toolbox.router.get('/', toolbox.networkFirst, {cache: bundleCache})

/**
 * It's unfortunate that the toolbox doesn't provide a way to add on custom response
 * headers, because that's all we need this for. This isn't as robust as their networkFirst
 * strategy.
 *
 * Basically, we fetch and cache - if it fails we try the cache, but add a
 * `x-mobify-progressive: offline` header for use by the application
 */
toolbox.router.get(/.*/, (request) => {
    let originalResponse

    return fetch(request.clone())
        .then((response) => {
            originalResponse = response

            // This is lifted from https://github.com/GoogleChrome/sw-toolbox/blob/master/lib/strategies/networkFirst.js#L59
            if (successResponses.test(response.status)) {
                caches.open(baseCacheName).then((cache) => {
                    cache.put(request, originalResponse)
                })

                return originalResponse.clone()
            }

            toolbox.options.debug && console.error(`Response was an HTTP error: ${response.statusText}`)
            throw new Error('Bad response')
        })
        .catch((error) => {
            toolbox.options.debug && console.error(`Network or response error, fallback to cache [${request.url}]`)

            /* eslint-disable max-nested-callbacks */
            return caches.open(baseCacheName).then((cache) => {
                return cache.match(request).then((response) => {
                    if (response) {
                        const newOptions = {
                            status: 200,
                            statusText: 'OK',
                            headers: {
                                'X-mobify-progressive': 'offline'
                            }
                        }

                        // Add the original headers from the response to our
                        // new response
                        response.headers.forEach((v, k) => {
                            newOptions.headers[k] = v
                        })

                        return response.text().then((body) => {
                            return new Response(body, newOptions)
                        })
                    }

                    if (originalResponse) {
                        return originalResponse
                    }


                    throw error
                })
            })
            /* eslint-enable max-nested-callbacks */
        })
})
