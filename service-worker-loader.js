const isPreview = /preview=(true|false)/.exec(self.location.search)[1]

self.importScripts(
    isPreview === 'true'
        ? 'https://localhost:8443/worker.js'
        : 'https://cdn.mobify.com/stuff'
)
