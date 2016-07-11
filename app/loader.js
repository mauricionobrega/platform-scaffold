import {getAssetUrl} from './utils/assets'

// Create React mounting target
const body = document.getElementsByTagName('body')[0]
const reactTarget = document.createElement('div')
reactTarget.className = 'react-target'
body.appendChild(reactTarget)

const script = document.createElement('script')
script.id = 'progressive-web-script'
script.src = getAssetUrl('main.js')
body.appendChild(script)
