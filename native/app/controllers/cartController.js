import Promise from 'bluebird'

import webViewPlugin from 'astro/plugins/webViewPlugin'
import baseConfig from '../config/baseConfig'

const CartController = function(webView){
    this.viewPlugin = webView
}

CartController.init = async function() {
    return new CartController(await webViewPlugin.init())
}

CartController.prototype.reload = function() {
    this.viewPlugin.navigate(baseConfig.cartUrl)
}

CartController.prototype.navigate = function(url){
    this.viewPlugin.navigate(url)
}

CartController.prototype.back = function(){
    this.viewPLugin.back()
}
