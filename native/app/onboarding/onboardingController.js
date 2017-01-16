
import WebViewPlugin from 'astro/plugins/webViewPlugin'
import AnchoredLayoutPlugin from 'astro/plugins/anchoredLayoutPlugin'
import onboardingConfig from './onboardingConfig'

const OnboardingController = function(navigationView, layout) {
    this.viewPlugin = layout
    this.navigationView = navigationView
}

OnboardingController.init = async function() {
    const [
        webView,
        layout
    ] = await Promise.all([
        WebViewPlugin.init(),
        AnchoredLayoutPlugin.init()
    ])

    // Disable webview loader when first loading onboarding page
    webView.disableLoader()
    webView.disableScrolling()

    layout.setContentView(webView)

    const onboardingController = new OnboardingController(webView, layout)
    onboardingController.navigate(onboardingConfig.url)

    return onboardingController
}

OnboardingController.prototype.navigate = function(url) {
    if (!url) {
        return
    }

    this.navigationView.navigate(url)
}

OnboardingController.prototype.back = function() {
    this.navigationView.back()
}

OnboardingController.prototype.canGoBack = function() {
    return this.navigationView.canGoBack()
}

export default OnboardingController
