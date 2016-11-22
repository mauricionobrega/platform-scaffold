/* global PROJECT_SLUG, DEBUG */
/* eslint-env worker, serviceworker */

import toolbox from 'sw-toolbox'

// Configuration options
const version = '0.1.0'
const precacheUrls = []

// Derived constants
const baseCacheName = `${PROJECT_SLUG}-v${version}`
toolbox.options.cache.name = baseCacheName
toolbox.options.cache.maxAgeSeconds = 86400
toolbox.debug = DEBUG
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

