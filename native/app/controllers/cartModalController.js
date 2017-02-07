import Promise from 'bluebird'

import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import ModalViewPlugin from 'progressive-app-sdk/plugins/modalViewPlugin'
import NavigationPlugin from 'progressive-app-sdk/plugins/navigationPlugin'

import AppEvents from '../global/app-events'
import CartHeaderController from './cartHeaderController'
import CartConfig from '../config/cartConfig'

const Events = {
    signInShow: 'sign-in:Show'
}

const CartModalController = function(modalView, navigationView) {
    this.isShowing = false
    this.viewPlugin = modalView
    this.navigationView = navigationView

    this.navigationView.on('sign-in:clicked', () => {
        this.hide()
        AppEvents.trigger(Events.signInShow)
    })

    this.navigationView.on('continue:clicked', () => {
        this.hide()
    })
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

    const headerOptions = {
        header: {
            rightIcon: {
                id: CartConfig.closeIcon.id,
                imageUrl: CartConfig.closeIcon.imageUrl
            }
        }
    }

    await anchoredLayout.addTopView(cartHeaderController.viewPlugin)
    await anchoredLayout.setContentView(navigationView)
    await navigationView.navigateToUrl(CartConfig.url, headerOptions, {})
    await navigationView.setHeaderBar(cartHeaderController.viewPlugin)

    await modalView.setContentView(anchoredLayout)                // load the view in to the modal

    const cartModalController = new CartModalController(modalView, navigationView)

    cartHeaderController.on('close', () => {
        cartModalController.hide()
    })

    cartHeaderController.on('back', () => {
        navigationView.back()
    })

    return cartModalController
}

CartModalController.prototype.show = async function() {
    if (this.isShowing) {
        return
    }
    this.isShowing = true
    this.viewPlugin.show({animated: true})
}

CartModalController.prototype.hide = async function() {
    await this.viewPlugin.hide({animated: true})
    this.isShowing = false
}

CartModalController.prototype.isActiveItem = function() {
    return this.isShowing
}

export {Events}

export default CartModalController
