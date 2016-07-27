import {getAssetUrl} from './utils/assets'
import {displayPreloader} from 'progressive-web-sdk/dist/preloader'

import preloadHTML from 'raw!./preloader/preload.html'
import preloadCSS from 'raw!./preloader/preload.css'
import preloadJS from 'raw!./preloader/preload.js'

displayPreloader(preloadCSS, preloadHTML, preloadJS)

// Create React mounting target
const head = document.getElementsByTagName('head')[0]
const body = document.getElementsByTagName('body')[0]
const reactTarget = document.createElement('div')
reactTarget.className = 'react-target'
body.appendChild(reactTarget)

const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = getAssetUrl('main.css')
head.appendChild(link)

const script = document.createElement('script')
script.id = 'progressive-web-script'
script.src = getAssetUrl('main.js')
body.appendChild(script)
