import Promise from 'bluebird'

import AnchoredLayoutPlugin from 'astro/plugins/anchoredLayoutPlugin'
import ModalViewPlugin from 'astro/plugins/modalViewPlugin'
import CartController from './cartController'
import CartHeaderController from './cartHeaderController'

const CartModalController = function(modalView, cartController) {
    this.isShowing = false
    this.viewPlugin = modalView
    this.cartController = cartController
}

CartModalController.init = async function() {
    const [
        modalView,
        anchoredLayout,
        cartController,
        cartHeaderController,
    ] = await Promise.all([
        ModalViewPlugin.init(),
        AnchoredLayoutPlugin.init(),
        CartController.init(),
        CartHeaderController.init(),
    ])

    await anchoredLayout.addTopView(cartHeaderController.viewPlugin)
    await anchoredLayout.setContentView(cartController.viewPlugin)
    await modalView.setContentView(anchoredLayout)                // load the view in to the modal

    const cartModalController = new CartModalController(modalView, cartController)

    cartHeaderController.registerCloseEvents(() => {
        cartModalController.hide()
    })

    return cartModalController
}

CartModalController.prototype.show = function() {
    if (this.isShowing) {
        return
    }
    this.isShowing = true
    this.cartController.reload()
    this.viewPlugin.show({animated: true})
}

CartModalController.prototype.hide = function() {
    this.isShowing = false
    this.cartController.navigate('about:blank')
    this.viewPlugin.hide({animated: true})
}

CartModalController.prototype.isActiveItem = function() {
    return this.isShowing
}

CartModalController.prototype.back = function() {
    this.cartController.back()
}

export default CartModalController
