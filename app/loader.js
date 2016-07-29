import {getAssetUrl, loadAsset} from './utils/assets'
import {displayPreloader} from 'progressive-web-sdk/dist/preloader'

const JQUERY_CDN = '//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js'
const CAPTURING_CDN = '//cdn.mobify.com/capturejs/capture-latest.min.js'

import preloadHTML from 'raw!./preloader/preload.html'
import preloadCSS from 'raw!./preloader/preload.css'
import preloadJS from 'raw!./preloader/preload.js' // eslint-disable-line import/default

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
    type: 'text/css'
})

const script = document.createElement('script')
script.id = 'progressive-web-script'
script.src = getAssetUrl('main.js')
body.appendChild(script)

const jQuery = document.createElement('script')
jQuery.async = true
jQuery.id = 'progressive-web-jquery'
jQuery.src = JQUERY_CDN
body.appendChild(jQuery)

const capturing = document.createElement('script')
capturing.async = true
capturing.id = 'progressive-web-capture'
capturing.src = CAPTURING_CDN
body.appendChild(capturing)
