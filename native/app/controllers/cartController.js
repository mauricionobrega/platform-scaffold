
import webViewPlugin from 'astro/plugins/webViewPlugin'
import CartConfig from '../config/cartConfig'

const CartController = function(webView) {
    this.viewPlugin = webView
}

CartController.init = async function() {
    return new CartController(await webViewPlugin.init())
}

CartController.prototype.reload = function() {
    this.viewPlugin.navigate(CartConfig.url)
}

CartController.prototype.navigate = function(url) {
    this.viewPlugin.navigate(url)
}

CartController.prototype.back = function() {
    this.viewPLugin.back()
}

export default CartController
