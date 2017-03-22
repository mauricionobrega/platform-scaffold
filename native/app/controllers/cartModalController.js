import Promise from 'bluebird'

import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import ModalViewPlugin from 'progressive-app-sdk/plugins/modalViewPlugin'
import NavigationPlugin from 'progressive-app-sdk/plugins/navigationPlugin'
import AlertViewPlugin from 'progressive-app-sdk/plugins/alertViewPlugin'

import AppEvents from '../global/app-events'
import CartHeaderController from './cartHeaderController'
import CartConfig from '../config/cartConfig'
import {Events as TabEvents} from './tabController'

const Events = {
    signInShow: 'sign-in:show',
    shopShow: 'shop:show'
}

const CartModalController = function(modalView, navigationView) {
    this.isShowing = false
    this.viewPlugin = modalView
    this.navigationView = navigationView
    this.alertEnabled = false

    this.navigationView.on('sign-in:clicked', () => {
        this.hide()
        AppEvents.trigger(Events.signInShow)
    })

    this.navigationView.on('continue:clicked', () => {
        this.hide()
        AppEvents.trigger(Events.shopShow)
    })

    this.navigationView.on('checkout:disable-alert', () => {
        this.alertEnabled = false
    })

    this.navigationView.on('checkout:enable-alert', () => {
        this.alertEnabled = true
    })

    this.navigationView.on('checkout:completed', () => {
        this.alertEnabled = false
        AppEvents.trigger(TabEvents.updateCart, {
            count: 0
        })
    })

    this.navigationView.on('cart-updated', (data) => {
        AppEvents.trigger(TabEvents.updateCart, data)
    })

    this.navigationView.on('close', () => {
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

    const alertViewOptions = {
        title: 'Are you sure you want to exit checkout?',
        text: 'You will lose all progress, but the items will remain in your cart for later!',
        okButton: 'Exit',
        cancelButton: 'Cancel'
    }

    await anchoredLayout.addTopView(cartHeaderController.viewPlugin)
    await anchoredLayout.setContentView(navigationView)
    await navigationView.navigateToUrl(CartConfig.url, headerOptions, {})
    await navigationView.setHeaderBar(cartHeaderController.viewPlugin)

    await modalView.setContentView(anchoredLayout)                // load the view in to the modal

    const cartModalController = new CartModalController(modalView, navigationView)

    cartHeaderController.on('back', () => {
        navigationView.back()
    })

    cartHeaderController.on('close', async () => {
        if (cartModalController.alertEnabled) {
            const okButtonPressed = await AlertViewPlugin.alert(alertViewOptions)
            if (okButtonPressed) {
                cartModalController.hide()
            }
        } else {
            cartModalController.hide()
        }
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
