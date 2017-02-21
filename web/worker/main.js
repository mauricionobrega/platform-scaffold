/* global PROJECT_SLUG, DEBUG */
/* eslint-env worker, serviceworker */

import toolbox from 'sw-toolbox'

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

const noCacheJSONResponse = (json) => {
    return new Response(
        new Blob(
            [JSON.stringify(json)],
            {type: 'application/json'}
        ),
        {
            status: 200,
            statusText: 'OK',
            headers: new Headers({
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            })
        }
    )
}

// App makes this asset request on each page fetch, expecting to see empty JSON
// if network supplies successful response.
// In the case of failure, we modify response to be `{offline: true}` which
// indicates to app that we are offline.
const checkIfOffline = (request) =>
    fetch(new Request(request, {cache: 'no-store'}))
    .catch(() => noCacheJSONResponse({offline: true}))

// For enabling offline detection within the application
// @TODO {MQ} - Modify this regular expression to match the final asset URL once
// created and uploaded to S3/CDN
toolbox.router.get(/online\.mobify\.net\/offline\.json/, checkIfOffline)

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

toolbox.router.default = toolbox.networkFirst
