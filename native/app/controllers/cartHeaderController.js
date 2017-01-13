import HeaderBarPlugin from 'progressive-app-sdk/plugins/headerBarPlugin'
import cartConfig from '../config/cartConfig'

const CartHeaderController = function(headerBar) {
    this.viewPlugin = headerBar
}

CartHeaderController.init = async function() {
    const headerBar = await HeaderBarPlugin.init()
    await headerBar.setRightIcon(cartConfig.closeIcon.imageUrl, cartConfig.closeIcon.id)
    await headerBar.setTextColor(cartConfig.colors.textColor)
    await headerBar.setBackgroundColor(cartConfig.colors.backgroundColor)
    await headerBar.setCenterTitle(cartConfig.shoppingCart.title, cartConfig.shoppingCart.id)      // Not necessary?
    await headerBar.setOpaque()
    return new CartHeaderController(headerBar)
}

CartHeaderController.prototype.registerCloseEvents = function(callback) {
    if (!callback) {
        return
    }
    this.viewPlugin.on(`click:${cartConfig.closeIcon.id}`, callback)
}

export default CartHeaderController
