/* global PROJECT_SLUG, DEBUG */
/* eslint-env worker, serviceworker */

import toolbox from 'sw-toolbox'

// Configuration options
const version = '0.1.0'
const precacheUrls = []
const manifest = {}

// Derived constants
const baseCacheName = `${PROJECT_SLUG}-v${version}`
toolbox.options.cache.name = baseCacheName
toolbox.options.cache.maxAgeSeconds = 86400
toolbox.debug = DEBUG

// No cache maintenance options here on purpose,
// this is a permanent cache
// NOTE: This should eventually have some sort of bundle identifier
// so that we throw it away when the bundle changes
const bundleCache = {
    name: `${baseCacheName}-bundle`
}

const imageCache = {
    name: `${baseCacheName}-images`,
    maxEntries: 40
}

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
                (key) => !key.startsWith(baseCacheName) && !key.endsWith('$$$inactive$$$')))
            .then((keysToDelete) => keysToDelete.map((key) => caches.delete(key)))
            .then((promises) => Promise.all(promises))
    )
})

// Path Handlers
toolbox.router.get('/manifest.json', () => {
    return jsonResponse(manifest)
})

toolbox.router.get(/\.(?:png|gif|svg|jpe?g)$/, toolbox.fastest, {cache: imageCache})

toolbox.router.get(/cdn\.mobify\.com\/.*\?[a-f\d]+$/, toolbox.cacheFirst, {cache: bundleCache})
toolbox.router.get(/localhost:8443.*\?[a-f\d]+$/, toolbox.cacheFirst, {cache: bundleCache})

// toolbox.router.default = toolbox.networkFirst
