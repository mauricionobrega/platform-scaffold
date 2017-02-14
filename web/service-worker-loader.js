// MOBIFY PROGRESSIVE SERVICE WORKER LOADER
// DO NOT MODIFY
const isPreview = /preview=true/.test(self.location.search)

if (isPreview) {
    self.importScripts('https://localhost:8443/worker.js')
} else {
    self.importScripts('https://cdn.mobify.com/sites/progressive-web-scaffold/production/worker.js')
}
