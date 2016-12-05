const isPreview = /preview=(true|false)/.exec(self.location.search)[1]

if (isPreview) {
    self.importScripts('https://localhost:8443/worker.js')
}
