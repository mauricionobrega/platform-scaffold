import WebViewPlugin from 'progressive-app-sdk/plugins/WebViewPlugin'
import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import SegmentedPlugin from 'progressive-app-sdk/plugins/segmentedPlugin'

const AccountSegmentationController = function(layout, webView, segmentedView) {
    this.layout = layout
    this.webView = webView
    this.segmentedView = segmentedView
}

AccountSegmentationController.init = async function() {
    const webView = await WebViewPlugin.init()
    const layout = await AnchoredLayoutPlugin.init()
    const segmentedView = await SegmentedPlugin.init()

    segmentedView.setItems([
        {
            key: 'registration',
            text: 'Registration'
        },
        {
            key: 'sign-in',
            text: 'Sign-in'
        }
    ])

    await layout.setContentView(webView)
    await layout.addTopView(segmentedView)
    await webView.navigate('https://google.ca')

    return new AccountSegmentationController(layout, webView, segmentedView)
}

export default AccountSegmentationController
