import HeaderBarPlugin from 'progressive-app-sdk/plugins/headerBarPlugin'
import CounterBadgeController from 'progressive-app-sdk/controllers/counterBadgeController'

import CartModalController from './cartModalController'

import baseConfig from '../config/baseConfig'
import cartConfig from '../config/cartConfig'

const TabHeaderController = function(headerBar, counterBadgeController) {
    this.viewPlugin = headerBar
    this.counterBadgeController = counterBadgeController
}

TabHeaderController.init = async function() {
    const headerBar = await HeaderBarPlugin.init()
    const counterBadgeController = await CounterBadgeController.init(cartConfig.cartIcon.imageUrl, 'headerId', {})
    const counterBadgePlugin = await counterBadgeController.generatePlugin()

    await headerBar.setCenterIcon(baseConfig.logoUrl, 'logo')
    await headerBar.setRightPlugin(counterBadgePlugin, cartConfig.cartIcon.id)
    await headerBar.setTextColor(baseConfig.colors.whiteColor)
    await headerBar.setBackgroundColor(baseConfig.colors.primaryColor)
    await headerBar.setOpaque()

    headerBar.on(`click:${cartConfig.cartIcon.id}`, async () => {
        const cartModalController = await CartModalController.init()
        cartModalController.show()
    })

    return new TabHeaderController(headerBar, counterBadgeController)
}

TabHeaderController.prototype.updateCounter = function(count) {
    this.counterBadgeController.updateCounterValue(count)
}

export default TabHeaderController