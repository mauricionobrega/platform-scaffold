import {getBuildOrigin} from 'progressive-web-sdk/dist/asset-utils'
import {isRunningInAstro} from './app/utils/astro-integration'

try {
    if (isRunningInAstro) {
        throw 'Service worker not supported in Astro'
    }
    // THIS IS A STRING VALUE NOT A BOOLEAN, BE CAREFUL
    const isPreview = /(true|false)/.exec(self.location.search)[1]
    if (isPreview === 'true') {
        const buildOrigin = getBuildOrigin()
        self.importScripts(`${buildOrigin}/worker.js`)
    } else {
        self.importScripts('https://cdn.mobify.com/sites/progressive-web-scaffold/production/worker.js')
    }
} catch (e) {
    console.log(e)
}
