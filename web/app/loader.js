/* global NATIVE_WEBPACK_ASTRO_VERSION */
import {getAssetUrl, loadAsset, initCacheManifest} from 'progressive-web-sdk/dist/asset-utils'
import {displayPreloader} from 'progressive-web-sdk/dist/preloader'
import cacheHashManifest from '../tmp/loader-cache-hash-manifest.json'
import {isRunningInAstro} from './utils/astro-integration'
import {loadScript} from './utils/utils'
import {getNeededPolyfills} from './utils/polyfills'
import ReactRegexes from './loader-routes'

import preloadHTML from 'raw-loader!./preloader/preload.html'
import preloadCSS from 'css-loader?minimize!./preloader/preload.css'
import preloadJS from 'raw-loader!./preloader/preload.js' // eslint-disable-line import/default

const isReactRoute = () => {
    return ReactRegexes.some((regex) => regex.test(window.location.pathname))
}

initCacheManifest(cacheHashManifest)

let hasInitialized = false

const attemptToInitializeApp = () => {
    if (getNeededPolyfills().length || hasInitialized) {
        return
    }

    window.Progressive = {
        AstroPromise: Promise.resolve({})
    }


    // This isn't accurate but does describe the case where the PR currently works
    const IS_PREVIEW = /mobify-path=true/.test(document.cookie)
    const ASTRO_VERSION = NATIVE_WEBPACK_ASTRO_VERSION // replaced at build time

    const CAPTURING_CDN = '//cdn.mobify.com/capturejs/capture-latest.min.js'
    const ASTRO_CLIENT_CDN = `//assets.mobify.com/astro/astro-client-${ASTRO_VERSION}.min.js`
    const SW_LOADER_PATH = `/service-worker-loader.js?preview=${IS_PREVIEW}&b=${cacheHashManifest.buildDate}`

    const loadWorker = () => (
        navigator.serviceWorker.register(SW_LOADER_PATH)
            .then(() => navigator.serviceWorker.ready)
            .catch(() => {})
    )

    const asyncInitApp = () => {
        window.webpackJsonpAsync = (module, exports, webpackRequire) => {
            const runJsonpAsync = () => {
                if (window.webpackJsonp) {
                    // Run app
                    window.webpackJsonp(module, exports, webpackRequire)
                } else {
                    setTimeout(runJsonpAsync, 50)
                }
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

    hasInitialized = true
}

// Apply polyfills
const neededPolyfills = getNeededPolyfills()

if (neededPolyfills.length) {
    neededPolyfills.forEach((polyfill) => polyfill.load(attemptToInitializeApp))
} else {
    attemptToInitializeApp()
}
