/* global AstroNative */

import Astro from 'progressive-app-sdk/astro-full'

// TODO: Update <local_ip> if running on Android
const localPreviewUrl = Astro.isRunningInIOSApp()
    ? '//localhost:8443/loader.js'
    : '<local_ip>:8443/loader.js'

const baseConfig = {
    baseURL: 'https://www.merlinspotions.com',
    previewBundle: AstroNative.Configuration.DEBUG
        ? localPreviewUrl
        : '//cdn.mobify.com/sites/progressive-web-scaffold/production/loader.js'
}

export default baseConfig
