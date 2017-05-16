/* global NATIVE_WEBPACK_ASTRO_VERSION, MESSAGING_SITE_ID */
import {getAssetUrl, loadAsset, initCacheManifest} from 'progressive-web-sdk/dist/asset-utils'
import {isSamsungBrowser} from 'progressive-web-sdk/dist/utils/utils'
import {displayPreloader} from 'progressive-web-sdk/dist/preloader'
import cacheHashManifest from '../tmp/loader-cache-hash-manifest.json'
import {isRunningInAstro} from './utils/astro-integration'
import {
    getMessagingSWVersion,
    isLocalStorageAvailable,
    loadAndInitMessagingClient,
    loadScriptAsPromise,
    updateMessagingSWVersion
} from './utils/loader-utils'
import {getNeededPolyfills} from './utils/polyfills'
import ReactRegexes from './loader-routes'

import preloadHTML from 'raw-loader!./preloader/preload.html'
import preloadCSS from 'css-loader?minimize!./preloader/preload.css'
import preloadJS from 'raw-loader!./preloader/preload.js' // eslint-disable-line import/default

const isReactRoute = () => {
    return ReactRegexes.some((regex) => regex.test(window.location.pathname))
}

window.Progressive = {}

initCacheManifest(cacheHashManifest)

const attemptToInitializeApp = () => {
    if (getNeededPolyfills().length) {
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

    // An array of functions that will be called when all the scripts
    // loaded by this function are done. They are only executed if all
    // the key scripts load and initialize successfully.
    const deferredUntilLoadComplete = []

    /**
     * Get the URL that should be used to load the service worker.
     * This is based on the SW_LOADER_PATH but may have additional
     * query parameters added that act as cachebreakers for the
     * Messaging part of the worker.
     * @returns String
     */
    const getServiceWorkerURL = () => {
        // In order to load the worker, we need to get the current Messaging
        // PWA service-worker version so that we can include it in the URL
        // (meaning that we will register a 'new' worker when that version
        // number changes).
        // The implementation here is designed to avoid adding an extra fetch
        // and slowing down the *first* run of the app. On the first run, we
        // will find nothing in localStorage, and return the URL without
        // any Messaging-worker parameters, but we'll do an asynchronous
        // fetch to update the parameters, which will then be used on the
        // next run.

        // We expect supported browsers to have local storage. If the browser
        // does not, then we may assume we're running in some situation
        // like incognito mode, in which case there is no point getting
        // Messaging worker version data, we can just use the base URL.
        if (!isLocalStorageAvailable()) {
            return SW_LOADER_PATH
        }

        const workerPathElements = [SW_LOADER_PATH]

        const swVersion = getMessagingSWVersion()
        if (swVersion) {
            workerPathElements.push(`msg_sw_version=${swVersion}`)
        }

        // Return the service worker path
        return workerPathElements.join('&')
    }

    /**
     * Load the service worker
     * @returns Promise.<Boolean> true when the worker is loaded and ready
     */
    const loadWorker = () => (
        navigator.serviceWorker.register(getServiceWorkerURL())
            .then(() => navigator.serviceWorker.ready)
            .then(() => true)
            .catch(() => {
            })
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

    /**
     * Do the preloading preparation for the Messaging client.
     * This includes any work that does not require a network fetch or
     * otherwise slow down initialization.
     */
    const setupMessagingClient = (serviceWorkerSupported) => {
        if ((!serviceWorkerSupported) || isRunningInAstro) {
            return
        }
        // We need to create window.Mobify.WebPush.PWAClient
        // at this point. If a project is configured to use
        // non-progressive Messaging, it will load the
        // webpush-client-loader, which will then detect that
        // window.Mobify.WebPush.PWAClient exists and do nothing.
        window.Mobify = window.Mobify || {}
        window.Mobify.WebPush = window.Mobify.WebPush || {}
        window.Mobify.WebPush.PWAClient = {}

        // Add a deferred function that will asynchronously update
        // the Messaging worker version data.
        deferredUntilLoadComplete.push(updateMessagingSWVersion)

        // We know we're not running in Astro, and that service worker is
        // supported and loaded, so we can add a deferred function to
        // load and initialize the Messaging client.
        deferredUntilLoadComplete.push(() => loadAndInitMessagingClient(IS_PREVIEW, MESSAGING_SITE_ID))
    }

    if (isReactRoute() && !isSamsungBrowser(window.navigator.userAgent)) {
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

        // Attempt to load the worker.
        (('serviceWorker' in navigator)
         ? loadWorker()
         : Promise.resolve(false)
        ).then((serviceWorkerSupported) => {

            // Set up the Messaging client intergration - this must be
            // done now, but the work is deferred until after script
            // loading is complete.
            setupMessagingClient(serviceWorkerSupported)

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

            // loadingPromises is an Array of Promises that are created when
            // we load scripts asynchronously.
            const loadingPromises = [
                window.Progressive.capturedDocHTMLPromise = loadScriptAsPromise({
                    id: 'progressive-web-capture',
                    src: CAPTURING_CDN,
                    rejectOnError: false
                })
                    // do the init in a then() so that the Promise can resolve
                    // to the enabledHTMLString
                    .then(
                        () => {
                            return new Promise((resolve) => {
                                window.Capture.init(
                                    (capture) => {
                                        // NOTE: by this time, the captured doc has changed a little
                                        // bit from original desktop. It now has some of our own
                                        // assets (e.g. main.css) but they can be safely ignored.
                                        resolve(capture.enabledHTMLString())
                                    }
                                )
                            })
                        }
                    ),

                loadScriptAsPromise({
                    id: 'progressive-web-jquery',
                    src: getAssetUrl('static/js/jquery.min.js')
                }),

                loadScriptAsPromise({
                    id: 'progressive-web-main',
                    src: getAssetUrl('main.js')
                }),

                loadScriptAsPromise({
                    id: 'progressive-web-vendor',
                    src: getAssetUrl('vendor.js')
                })
            ]

            if (isRunningInAstro) {
                loadingPromises.push(
                    window.Progressive.AstroPromise = loadScriptAsPromise({
                        id: 'progressive-web-app',
                        src: ASTRO_CLIENT_CDN,
                        rejectOnError: false
                    })
                        .then(() => window.Astro)
                )

            }

            Promise.all(loadingPromises)
                .then(
                    // Execute any deferred functions
                    () => deferredUntilLoadComplete.forEach((def) => { def() })
                )
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
}

// Apply polyfills
const neededPolyfills = getNeededPolyfills()

if (neededPolyfills.length) {
    neededPolyfills.forEach((polyfill) => polyfill.load(attemptToInitializeApp))
} else {
    attemptToInitializeApp()
}
