import Promise from 'bluebird'

import AnchoredLayoutPlugin from 'astro/plugins/anchoredLayoutPlugin'
import ModalViewPlugin from 'astro/plugins/modalViewPlugin'
import WebViewPlugin from 'astro/plugins/webViewPlugin'
import CartConfig from '../config/cartConfig'

const CartModalController = function(modalView, webView) {
    this.isShowing = false
    this.viewPlugin = modalView
    this.webView = webView
}

CartModalController.init = async function() {
    const [
        modalView,
        anchoredLayout,
        webView
    ] = await Promise.all([
        ModalViewPlugin.init(),
        AnchoredLayoutPlugin.init(),
        WebViewPlugin.init()
    ])

    await webView.navigate(CartConfig.url)
    await anchoredLayout.setContentView(webView)
    await modalView.setContentView(anchoredLayout)                // load the view in to the modal

    const cartModalController = new CartModalController(modalView, webView)
    return cartModalController
}

CartModalController.prototype.show = function() {
    if (this.isShowing) {
        return
    }
    this.isShowing = true
    this.viewPlugin.show({animated: true})
}

CartModalController.prototype.hide = function() {
    this.isShowing = false
    this.viewPlugin.hide({animated: true})
}

CartModalController.prototype.isActiveItem = function() {
    return this.isShowing
}

export default CartModalController
