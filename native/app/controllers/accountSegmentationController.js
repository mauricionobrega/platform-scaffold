import WebViewPlugin from 'progressive-app-sdk/plugins/WebViewPlugin'
import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import SegmentedPlugin from 'progressive-app-sdk/plugins/segmentedPlugin'

import accountConfig from '../config/accountConfig'

const AccountSegmentationController = function(viewPlugin, signInView, registerView, segmentedView) {
    this.viewPlugin = viewPlugin
    this.signInView = signInView
    this.registerView = registerView
    this.segmentedView = segmentedView

    this.isActive = false
    this.isloaded = false
}

AccountSegmentationController.init = async function() {
    const signInView = await WebViewPlugin.init()
    const registerView = await WebViewPlugin.init()
    const viewPlugin = await AnchoredLayoutPlugin.init()
    const segmentedView = await SegmentedPlugin.init()

    signInView.navigate(accountConfig.signIn.url)
    registerView.navigate(accountConfig.register.url)

    await viewPlugin.setContentView(signInView)
    await viewPlugin.addTopView(segmentedView)

    await segmentedView.setItems([
        accountConfig.signIn,
        accountConfig.register
    ])

    await segmentedView.setColor(accountConfig.color)

    segmentedView.on('itemSelect', (params) => {
        switch (params.key) {
            case accountConfig.signIn.key:
                viewPlugin.setContentView(signInView)
                break
            case accountConfig.register.key:
                viewPlugin.setContentView(registerView)
                break
        }
    })

    return new AccountSegmentationController(viewPlugin, signInView, registerView, segmentedView)
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
