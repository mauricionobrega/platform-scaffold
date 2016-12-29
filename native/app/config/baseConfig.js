/* global AstroNative */

const baseConfig = {
    baseURL: 'https://www.merlinspotions.com',
    previewBundle: AstroNative.Configuration.DEBUG
        ? '//192.168.32.90:8443/loader.js'
        : '//cdn.mobify.com/sites/progressive-web-scaffold/production/loader.js'
}

export default baseConfig
