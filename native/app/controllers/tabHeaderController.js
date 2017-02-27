import HeaderBarPlugin from 'progressive-app-sdk/plugins/headerBarPlugin'
import CounterBadgeController from 'progressive-app-sdk/controllers/counterBadgeController'

import CartModalController from './cartModalController'

import AppEvents from '../global/app-events'
import baseConfig from '../config/baseConfig'
import cartConfig from '../config/cartConfig'
import {Events} from './TabController'

const TabHeaderController = function(headerBar, counterBadgeController) {
    this.viewPlugin = headerBar
    this.counterBadgeController = counterBadgeController

    headerBar.on(`click:${cartConfig.cartIcon.id}`, async () => {
        this.showCartModal()
    })

    AppEvents.on(Events.updateCart, (data) => {
        this.updateCounter(data.count)
    })
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

    return new TabHeaderController(headerBar, counterBadgeController)
}

TabHeaderController.prototype.updateCounter = function(count) {
    this.counterBadgeController.updateCounterValue(count)
}

TabHeaderController.prototype.showCartModal = async () => {
    const cartModalController = await CartModalController.init()
    cartModalController.show()
}

export default TabHeaderController
