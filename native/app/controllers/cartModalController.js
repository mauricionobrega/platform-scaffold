import Promise from 'bluebird'

import AnchoredLayoutPlugin from 'astro/plugins/anchoredLayoutPlugin'
import ModalViewPlugin from 'astro/plugins/modalViewPlugin'
import NavigationPlugin from 'astro/plugins/navigationPlugin'

// import CartController from './cartController'
import CartHeaderController from './cartHeaderController'
import CartConfig from '../config/cartConfig'

const CartModalController = function(modalView, navigationView) {
    this.isShowing = false
    this.viewPlugin = modalView
    this.navigationView = navigationView
}

CartModalController.init = async function() {
    const [
        modalView,
        anchoredLayout,
        navigationView,
        cartHeaderController,
    ] = await Promise.all([
        ModalViewPlugin.init(),
        AnchoredLayoutPlugin.init(),
        NavigationPlugin.init(),
        CartHeaderController.init(),
    ])

    await anchoredLayout.addTopView(cartHeaderController.viewPlugin)
    await anchoredLayout.setContentView(navigationView)
    await navigationView.setHeaderBar(cartHeaderController.viewPlugin)

    await modalView.setContentView(anchoredLayout)                // load the view in to the modal

    const cartModalController = new CartModalController(modalView, navigationView)

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
    this.navigationView.navigate(CartConfig.url)
    this.viewPlugin.show({animated: true})
}

CartModalController.prototype.hide = function() {
    this.isShowing = false
    this.navigationView.popToRoot()
    this.viewPlugin.hide({animated: true})
}

CartModalController.prototype.isActiveItem = function() {
    return this.isShowing
}

CartModalController.prototype.back = function() {
    this.navigationView.back()
}

export default CartModalController
