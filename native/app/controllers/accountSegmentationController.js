import WebViewPlugin from 'progressive-app-sdk/plugins/WebViewPlugin'
import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import SegmentedPlugin from 'progressive-app-sdk/plugins/segmentedPlugin'

import accountConfig from '../config/accountConfig'

const AccountSegmentationController = function(viewPlugin, webView, segmentedView) {
    this.viewPlugin = viewPlugin
    this.webView = webView
    this.segmentedView = segmentedView

    this.isActive = false
    this.isloaded = false
}

AccountSegmentationController.init = async function() {
    const webView = await WebViewPlugin.init()
    const viewPlugin = await AnchoredLayoutPlugin.init()
    const segmentedView = await SegmentedPlugin.init()

    await viewPlugin.setContentView(webView)
    await viewPlugin.addTopView(segmentedView)

    await segmentedView.setItems([
        accountConfig.signIn,
        accountConfig.register
    ])

    await segmentedView.setColor(accountConfig.color)

    segmentedView.on('itemSelect', (params) => {
        switch (params.key) {
            case accountConfig.signIn.key:
                webView.navigate(accountConfig.signIn.url)
                break
            case accountConfig.register.key:
                webView.navigate(accountConfig.register.url)
                break
        }
    })

    await segmentedView.selectItem(accountConfig.signIn.key)       // by default loadup signIn

    return new AccountSegmentationController(viewPlugin, webView, segmentedView)
}

AccountSegmentationController.prototype.showRegistration = async function() {
    await this.segmentedView.selectItem(accountConfig.register.key)
}

AccountSegmentationController.prototype.showSignIn = async function() {
    await this.segmentedView.selectItem(accountConfig.signIn.key)
}

AccountSegmentationController.prototype.reload = async function() {
    this.loaded = true
}

AccountSegmentationController.prototype.activate = function() {
    if (!this.isActive) {
        this.isActive = true
        if (!this.loaded) {
            this.reload()
        }
    }
}

AccountSegmentationController.prototype.deactivate = function() {
    this.isActive = false
}

export default AccountSegmentationController
