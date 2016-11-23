import {getAssetUrl, loadAsset, initCacheManifest} from 'progressive-web-sdk/dist/asset-utils'
import {displayPreloader} from 'progressive-web-sdk/dist/preloader'
import cacheHashManifest from '../tmp/loader-cache-hash-manifest.json'
import FrameBridge from 'progressive-web-sdk/dist/iframe/parent'

window.Progressive = window.Progressive || {}

import ReactRegexes from './loader-routes'

const isInIframe = () => {
    try {
        return window.self !== window.top
    } catch (e) {
        return true
    }
}

const isReactRoute = () => {
    return ReactRegexes.some((regex) => regex.test(window.location.pathname))
}

initCacheManifest(cacheHashManifest)

const CAPTURING_CDN = '//cdn.mobify.com/capturejs/capture-latest.min.js'

import preloadHTML from 'raw!./preloader/preload.html'
import preloadCSS from 'css?minimize!./preloader/preload.css'
import preloadJS from 'raw!./preloader/preload.js' // eslint-disable-line import/default

if (isReactRoute() && !isInIframe()) {
    displayPreloader(preloadCSS, preloadHTML, preloadJS)

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

    loadAsset('link', {
        href: getAssetUrl('main.css'),
        rel: 'stylesheet',
        type: 'text/css',
        // Tell us when the stylesheet has loaded so we know when it's safe to
        // display the app! This prevents a flash of unstyled content.
        onload: 'window.Progressive.stylesheetLoaded = true;'
    })

    const script = document.createElement('script')
    script.id = 'progressive-web-script'
    // Setting UTF-8 as our encoding ensures that certain strings (i.e.
    // Japanese text) are not improperly converted to something else.
    script.charset = 'utf-8'
    script.src = getAssetUrl('main.js')
    body.appendChild(script)

    const jQuery = document.createElement('script')
    jQuery.async = true
    jQuery.id = 'progressive-web-jquery'
    jQuery.src = getAssetUrl('static/js/jquery.min.js')
    body.appendChild(jQuery)

    const capturing = document.createElement('script')
    capturing.async = true
    capturing.id = 'progressive-web-capture'
    capturing.src = CAPTURING_CDN
    body.appendChild(capturing)

    new FrameBridge({debug: true}) // eslint-disable-line no-new
} else if (isInIframe()) {
    // Child iframe
    loadAsset('script', {src: '//cdn.mobify.com/capturejs/capture-latest.min.js', async: true, className: 'capture-remove'})
    const contentApi = `<script src="${getAssetUrl('content-api.js')}"></script>`

    const interval = setInterval(() => {
        if (window.Capture) {
            clearInterval(interval)
            window.Capture.init((capture) => {
                capture.restore(contentApi)

            })
        }
    }, 150)
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
