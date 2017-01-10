
import HeaderBarPlugin from 'astro/plugins/headerBarPlugin'
import CartConfig from '../config/cartConfig'

const CartHeaderController = function(headerBar) {
    this.viewPlugin = headerBar
}

CartHeaderController.init = async function() {
    const headerBar = await HeaderBarPlugin.init()
    await headerBar.setRightIcon(CartConfig.closeIcon.imageUrl, CartConfig.closeIcon.id)
    return new CartHeaderController(headerBar)
}

CartHeaderController.prototype.registerCloseEvents = function(callback) {
    if (!callback) {
        return
    }
    this.viewPlugin.on(`click:${CartConfig.closeIcon.id}`, callback)
}

export default CartHeaderController
