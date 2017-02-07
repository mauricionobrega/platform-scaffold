// THIS IS A STRING VALUE NOT A BOOLEAN, BE CAREFUL
const isPreview = /preview=(true|false)/.exec(self.location.search)[1]

if (isPreview === 'true') {
    self.importScripts('https://localhost:8443/worker.js')
} else {
    self.importScripts('https://cdn.mobify.com/sites/progressive-web-scaffold/production/worker.js')
}
