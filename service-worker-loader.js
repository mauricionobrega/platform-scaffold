// THIS IS A STRING VALUE NOT A BOOLEAN
const isPreview = /preview=(true|false)/.exec(self.location.search)[1]

if (isPreview === 'true') {
    self.importScripts('https://localhost:8443/worker.js')
}
