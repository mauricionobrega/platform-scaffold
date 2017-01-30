import HeaderBarPlugin from 'progressive-app-sdk/plugins/headerBarPlugin'

import baseConfig from '../config/baseConfig'

const TabHeaderController = function(headerBar) {
    this.viewPlugin = headerBar
}

TabHeaderController.init = async function() {
    const headerBar = await HeaderBarPlugin.init()
    await headerBar.setCenterIcon(baseConfig.logoUrl, 'logo')
    await headerBar.setTextColor(baseConfig.colors.whiteColor)
    await headerBar.setBackgroundColor(baseConfig.colors.primaryColor)
    await headerBar.setOpaque()

    return new TabHeaderController(headerBar)
}

// CounterBadgeController.init(cartConfig.cartIcon.imageUrl, 'headerId', {})
export default TabHeaderController
