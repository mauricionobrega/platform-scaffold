/* global PROJECT_SLUG, DEBUG */
/* eslint-env worker, serviceworker */

import toolbox from 'sw-toolbox'

const cachebreaker = /b=([^&]+)/.exec(self.location.search)[1]
const CAPTURING_URL = 'https://cdn.mobify.com/capturejs/capture-latest.min.js'

const version = '0.1.1'
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

// Utility functions
const jsonResponse = (data) => {
    return new Response(
        new Blob(
            [JSON.stringify(data)],
            {type: 'application/json'}
        ),
        {
            status: 200,
            statusText: 'OK'
        }
    )
}

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

toolbox.router.get(/cdn\.mobify\.com\/.*\?[a-f\d]+$/, toolbox.cacheFirst, {cache: bundleCache})
toolbox.router.get(/localhost:8443.*\?[a-f\d]+$/, toolbox.networkFirst, {cache: bundleCache})
toolbox.router.get(new RegExp(`^${CAPTURING_URL}$`), toolbox.networkFirst, {cache: bundleCache})
toolbox.router.get(/cdn\.mobify\.com\/.*loader\.js$/, toolbox.networkFirst, {cache: bundleCache})


toolbox.router.default = toolbox.networkFirst
