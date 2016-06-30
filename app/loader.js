import {getAssetUrl} from './utils/assets'

const isCapturing = document.getElementsByTagName('plaintext').length > 0

if (isCapturing) {

    // Load the React application
    let loadReact = () => {
        // Create React mounting target
        const body = document.getElementsByTagName('body')[0]
        const reactTarget = document.createElement('div')
        reactTarget.className = 'react-target'
        body.appendChild(reactTarget)

        const script = document.createElement('script')
        script.id = 'progressive-web-script'
        script.src = getAssetUrl('app.js')
        body.appendChild(script)
    }

    loadReact()
}
