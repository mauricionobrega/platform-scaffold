import WebViewPlugin from 'progressive-app-sdk/plugins/WebViewPlugin'
import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import SegmentedPlugin from 'progressive-app-sdk/plugins/segmentedPlugin'

import TabHeaderController from './tabHeaderController'
import accountConfig from '../config/accountConfig'

const AccountSegmentationController = function(viewPlugin, signInView, registerView, segmentedView, layout, headerController) {
    this.viewPlugin = viewPlugin
    this.signInView = signInView
    this.registerView = registerView
    this.segmentedView = segmentedView
    this.layout = layout
    this.headerController = headerController

    this.isActive = false
    this.isloaded = false
}

AccountSegmentationController.init = async function() {
    const signInView = await WebViewPlugin.init()
    const registerView = await WebViewPlugin.init()
    const viewPlugin = await AnchoredLayoutPlugin.init()
    const segmentedView = await SegmentedPlugin.init()
    const layout = await AnchoredLayoutPlugin.init()
    const headerController = await TabHeaderController.init()

    // await signInView.setPageTimeOutDuration(60)
    // await registerView.setPageTimeOutDuration(60)

    signInView.navigate(accountConfig.signIn.url)
    registerView.navigate(accountConfig.register.url)

    await layout.setContentView(signInView)
    await layout.addTopView(segmentedView)

    await viewPlugin.addTopView(headerController.viewPlugin)
    await viewPlugin.setContentView(layout)

    await segmentedView.setItems([
        accountConfig.signIn,
        accountConfig.register
    ])

    await segmentedView.setColor(accountConfig.color)

    segmentedView.on('itemSelect', (params) => {
        layout.clearContentView()
        switch (params.key) {
            case accountConfig.signIn.key:
                layout.setContentView(signInView)
                break
            case accountConfig.register.key:
                layout.setContentView(registerView)
                break
        }
    })

    return new AccountSegmentationController(viewPlugin, signInView, registerView, segmentedView, layout, headerController)
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
