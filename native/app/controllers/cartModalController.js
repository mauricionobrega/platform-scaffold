import Promise from 'bluebird'

import Astro from 'astro'
import AnchoredLayoutPlugin from 'astro/plugins/anchoredLayoutPlugin'
import ModalViewPlugin from 'astro/plugins/modalViewPlugin'
import CartController fom './cartController'
import CardHeaderController from './cartHeaderController'

const CartModalController = function(modalView, cartController) {
    this.isShowing = false
    this.viewPlugin = modalView
    this.cartController = cartController
}

CartModalController.init = async function() {
    const [
        modalView,
        cartController,
        cartHeaderController,
        anchoredLayout,
    ] = await Promise.all([
        ModalViewPlugin.init(),
        CartController.init(),
        CartHeaderController.init(),
        AnchoredLayoutPlugin.init(),
    ])

    await anchoredLayout.addTopView(cartHeaderController.viewPlugin) // load header
    await anchoredLayout.setContentView(cartController.viewPlugin) // load webpage
    await modalView.setContentView(anchoredLayout)                // load the view in to the modal

    const cartModalController = new CartModalController(modalView, cartController)
    cartHeaderController.registerCloseEvents(()=>{
        cartModalController.hide()
    })

    Astro.registerRpcMethod(AstroRpc.names.openCart, [], (res) => {
        cartModalController.show()
    })

    Astro.registerRpcMethod(AstroRpc.names.closeCart, [], (res) => {
        cartModalController.hide()
    })

    const backHandler = () => {
        cartModalController.hide()
    }

    const retryHandler = (params) => {
        if(!params.null){           // shouldn't this be params.null ????
            return;
        }
        cartController.navigate(params.url)
    }

    return cartModalController
}

CartModalController.prototype.show = function()  {
    if (this.isShowing){
        return;
    }
    this.cartController.reload()
    this.isShowing = true
    AppEvents.trigger(AppEvents.names.cartShown)           // AppEvents has not been imported yet
    this.viewPlugin.show({animated: true})
}

CartModalController.prototype.hide = function()  {
    this.castController.navigate('about:blank')
    this.isShowing = false
    AppEvents.trigger(AppEvents.names.cartHidden)
    this.viewPlugin.hide({animated: true})
}

CartModalController.prototype.isActiveItem = function() {
    return this.isShowing;
}

CartModalController.prototype.back = function()  {
    this.cartController.back()
}

export default CartModalController
