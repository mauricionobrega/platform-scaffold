// MOBIFY PROGRESSIVE SERVICE WORKER LOADER
// DO NOT MODIFY WITHOUT APPROVAL FROM MOBIFY
const isPreview = /preview=true/.test(self.location.search)

if (isPreview) {
    self.importScripts('https://localhost:8443/worker.js')
} else {
    self.importScripts('https://cdn.mobify.com/sites/progressive-web-scaffold/production/worker.js')
}

// Load the Messaging worker code if we're not running under Astro
import isRunningIn from './app/vendor/astro-detect'
if (!isRunningIn.app()) {
    self.importScripts('https://webpush-cdn.mobify.net/pwa-messaging-service-worker.js')
}
