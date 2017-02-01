import WebViewPlugin from 'progressive-app-sdk/plugins/WebViewPlugin'
import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import SegmentedPlugin from 'progressive-app-sdk/plugins/segmentedPlugin'

import accountConfig from '../config/accountConfig'
import AppEvents from '../global/app-events'

const AccountSegEvents = {
    // raised when onboarding modal is hidden
    registerSelected: 'account:register',
    // raised when onboarding modal is displayed
    signInSelected: 'account:signIn'
}

const AccountSegmentationController = function(layout, webView, segmentedView) {
    this.layout = layout
    this.webView = webView
    this.segmentedView = segmentedView
}

AccountSegmentationController.init = async function() {
    const webView = await WebViewPlugin.init()
    const layout = await AnchoredLayoutPlugin.init()
    const segmentedView = await SegmentedPlugin.init()

    await layout.setContentView(webView)
    await layout.addTopView(segmentedView)

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

    AppEvents.on(AccountSegEvents.registerSelected, () => {
        segmentedView.selectItem(accountConfig.register.key)
    })

    AppEvents.on(AccountSegEvents.signInSelected, () => {
        segmentedView.selectItem(accountConfig.signIn.key)
    })

    return new AccountSegmentationController(layout, webView, segmentedView)
}

AccountSegmentationController.prototype.showRegistration = async function() {
    await this.segmentedView.selectItem(accountConfig.register.key)
}

AccountSegmentationController.prototype.showSignIn = async function() {
    await this.segmentedView.selectItem(accountConfig.signIn.key)
}

export {AccountSegEvents}

export default AccountSegmentationController
