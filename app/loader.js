import {getAssetUrl} from './utils/assets'

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
