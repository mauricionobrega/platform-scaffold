/* global AstroNative */

import Astro from 'progressive-app-sdk/astro-full'

// TODO: Update <local_ip> if running on Android
const localPreviewUrl = Astro.isRunningInIOSApp()
    ? '//localhost:8443/loader.js'
    : '<local_ip>:8443/loader.js'

const colors = {
    primaryColor: '#4E439B',
    secondaryColor: '#007ba7',
    whiteColor: '#ffffff'
}

const baseConfig = {
    baseURL: 'https://www.merlinspotions.com',
    previewBundle: AstroNative.Configuration.DEBUG
        ? localPreviewUrl
        : '//cdn.mobify.com/sites/progressive-web-scaffold/astro/loader.js',
    colors,
    logoUrl: 'file:///logo.png',
}

export default baseConfig
