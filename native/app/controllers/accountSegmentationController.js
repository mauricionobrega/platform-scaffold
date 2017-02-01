import WebViewPlugin from 'progressive-app-sdk/plugins/WebViewPlugin'
import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import SegmentedPlugin from 'progressive-app-sdk/plugins/segmentedPlugin'

import accountConfig from '../config/accountConfig'

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

    return new AccountSegmentationController(layout, webView, segmentedView)
}

AccountSegmentationController.prototype.showRegistration = async function() {
    await this.segmentedView.selectItem(accountConfig.register.key)
}

AccountSegmentationController.prototype.showSignIn = async function() {
    await this.segmentedView.selectItem(accountConfig.signIn.key)
}

export default AccountSegmentationController
