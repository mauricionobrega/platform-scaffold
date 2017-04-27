/* global NATIVE_WEBPACK_ASTRO_VERSION */
import {getAssetUrl, loadAsset, initCacheManifest} from 'progressive-web-sdk/dist/asset-utils'
import {displayPreloader} from 'progressive-web-sdk/dist/preloader'
import cacheHashManifest from '../tmp/loader-cache-hash-manifest.json'
import {isRunningInAstro} from './utils/astro-integration'

window.Progressive = {
    AstroPromise: Promise.resolve({})
}

import ReactRegexes from './loader-routes'

const isReactRoute = () => {
    return ReactRegexes.some((regex) => regex.test(window.location.pathname))
}

initCacheManifest(cacheHashManifest)

// This isn't accurate but does describe the case where the PR currently works
const IS_PREVIEW = /mobify-path=true/.test(document.cookie)
const ASTRO_VERSION = NATIVE_WEBPACK_ASTRO_VERSION // replaced at build time

const CAPTURING_CDN = '//cdn.mobify.com/capturejs/capture-latest.min.js'
const ASTRO_CLIENT_CDN = `//assets.mobify.com/astro/astro-client-${ASTRO_VERSION}.min.js`
const SW_LOADER_PATH = `/service-worker-loader.js?preview=${IS_PREVIEW}&b=${cacheHashManifest.buildDate}`

import preloadHTML from 'raw-loader!./preloader/preload.html'
import preloadCSS from 'css-loader?minimize!./preloader/preload.css'
import preloadJS from 'raw-loader!./preloader/preload.js' // eslint-disable-line import/default

const loadWorker = () => (
      navigator.serviceWorker.register(SW_LOADER_PATH)
        .then(() => navigator.serviceWorker.ready)
        .catch(() => {})
)

// webpackJsonpAsync is a custom async webpack code splitting chunk wrapper
// webpackJsonp is a webpack code splitting vendor wrapper
// webpackJsonpAsync should wait and call webpackJsonp with payload when all dependencies are loaded
const asyncInitApp = () => {
    window.webpackJsonpAsync = (module, exports, webpackRequire) => {
        const runJsonpAsync = function() {
            return (window.webpackJsonp)
                ? window.webpackJsonp(module, exports, webpackRequire)
                : setTimeout(runJsonpAsync, 50)
        }

        runJsonpAsync()
    }
}

if (isReactRoute()) {
    if (!isRunningInAstro) {
        displayPreloader(preloadCSS, preloadHTML, preloadJS)
    }

    // Create React mounting target
    const body = document.getElementsByTagName('body')[0]
    const reactTarget = document.createElement('div')
    reactTarget.className = 'react-target'
    body.appendChild(reactTarget)

    const loadScript = ({id, src, onload, isAsync = true}) => {
        const script = document.createElement('script')

        // Setting UTF-8 as our encoding ensures that certain strings (i.e.
        // Japanese text) are not improperly converted to something else. We
        // do this on the vendor scripts also just in case any libs we
        // import have localized strings in them.
        script.charset = 'utf-8'
        script.async = isAsync
        script.id = id
        script.src = src
        script.onload = typeof onload === typeof function() {}
            ? onload
            : () => {}

        body.appendChild(script)
    }

    /* eslint-disable max-len */
    loadAsset('meta', {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
    })
    /* eslint-enable max-len */

    loadAsset('meta', {
        name: 'theme-color',
        content: '#4e439b'
    });

    // load the worker if available
    // if no worker is available, we have to assume that promises might not be either.
    (('serviceWorker' in navigator)
     ? loadWorker()
     : {then: (fn) => setTimeout(fn)}
    ).then(() => {
        loadAsset('link', {
            href: getAssetUrl('main.css'),
            rel: 'stylesheet',
            type: 'text/css',
            // Tell us when the stylesheet has loaded so we know when it's safe to
            // display the app! This prevents a flash of unstyled content.
            onload: 'window.Progressive.stylesheetLoaded = true;'
        })

        loadAsset('link', {
            href: getAssetUrl('static/manifest.json'),
            rel: 'manifest'
        })

        asyncInitApp()

        window.Progressive.capturedDocHTMLPromise = new Promise((resolve) => {
            loadScript({
                id: 'progressive-web-capture',
                src: CAPTURING_CDN,
                onload: () => {
                    window.Capture.init((capture) => {
                        // NOTE: by this time, the captured doc has changed a little
                        // bit from original desktop. It now has some of our own
                        // assets (e.g. main.css) but they can be safely ignored.
                        resolve(capture.enabledHTMLString())
                    })
                },
                onerror: resolve
            })
        })

        if (isRunningInAstro) {
            window.Progressive.AstroPromise = new Promise((resolve) => {
                loadScript({
                    id: 'progressive-web-app',
                    src: ASTRO_CLIENT_CDN,
                    onload: () => {
                        resolve(window.Astro)
                    },
                    onerror: resolve
                })
            })
        }

        loadScript({
            id: 'progressive-web-jquery',
            src: getAssetUrl('static/js/jquery.min.js')
        })

        // Apply polyfills
        if (!Array.prototype.fill || !window.Promise) {
            loadScript({
                id: 'progressive-web-core-polyfill',
                src: getAssetUrl('core-polyfill.js'),
                isAsync: false
            })
        }

        if (!global.fetch) {
            loadScript({
                id: 'progressive-web-fetch-polyfill',
                src: getAssetUrl('fetch-polyfill.js'),
                isAsync: false
            })
        }

        loadScript({
            id: 'progressive-web-main',
            src: getAssetUrl('main.js')
        })

        loadScript({
            id: 'progressive-web-vendor',
            src: getAssetUrl('vendor.js')
        })
    })
} else {
    const capturing = document.createElement('script')
    capturing.async = true
    capturing.id = 'progressive-web-capture'
    capturing.src = CAPTURING_CDN
    document.body.appendChild(capturing)

    const interval = setInterval(() => {
        if (window.Capture) {
            clearInterval(interval)
            window.Capture.init((capture) => {
                capture.restore()
            })
        }
    }, 150)
}
