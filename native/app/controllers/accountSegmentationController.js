import WebViewPlugin from 'progressive-app-sdk/plugins/WebViewPlugin'
import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import SegmentedPlugin from 'progressive-app-sdk/plugins/segmentedPlugin'

import TabHeaderController from './tabHeaderController'
import accountConfig from '../config/accountConfig'

const AccountSegmentationController = function(viewPlugin, headerController, layout, segmentedView, signInView, registerView) {
    this.viewPlugin = viewPlugin
    this.headerController = headerController
    this.layout = layout
    this.segmentedView = segmentedView
    this.signInView = signInView
    this.registerView = registerView

    this.isActive = false
    this.isloaded = false
}

AccountSegmentationController.init = async function() {
    const viewPlugin = await AnchoredLayoutPlugin.init()                // has the header and the layout with the segmentedView
    const headerController = await TabHeaderController.init()           // header
    const layout = await AnchoredLayoutPlugin.init()                    // has  the segmented view and the web views
    const segmentedView = await SegmentedPlugin.init()
    const signInView = await WebViewPlugin.init()
    const registerView = await WebViewPlugin.init()

    await viewPlugin.addTopView(headerController.viewPlugin)
    await viewPlugin.setContentView(layout)

    signInView.navigate(accountConfig.signIn.url)
    registerView.navigate(accountConfig.register.url)

    await layout.setContentView(signInView)
    await layout.addTopView(segmentedView)

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

    return new AccountSegmentationController(viewPlugin, headerController, layout, segmentedView, signInView, registerView)
}

AccountSegmentationController.prototype.showRegistration = async function() {
    await this.segmentedView.selectItem(accountConfig.register.key)
}

AccountSegmentationController.prototype.showSignIn = async function() {
    await this.segmentedView.selectItem(accountConfig.signIn.key)
}

AccountSegmentationController.prototype.reload = async function() {
    this.loaded = true
    this.signInView.navigate(accountConfig.signIn.url)
    this.registerView.navigate(accountConfig.register.url)
}

AccountSegmentationController.prototype.activate = function() {
    if (!this.isActive) {
        this.isActive = true
        if (!this.loaded) {
            this.reload()
        }
    }
    this.reload()
}

AccountSegmentationController.prototype.deactivate = function() {
    this.isActive = false
}

export default AccountSegmentationController
