import Promise from 'bluebird'

import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import NavigationPlugin from 'progressive-app-sdk/plugins/navigationPlugin'
import Application from 'progressive-app-sdk/application'

import TabHeaderController from './tabHeaderController'

const TabController = function(tabItem, layout, navigationView, headerController) {
    this.tabItem = tabItem
    this.id = tabItem.id
    this.viewPlugin = layout
    this.navigationView = navigationView
    this.headerController = headerController

    this.isActive = false
    this.loaded = false
}

TabController.init = async function(tabItem) {
    const [
        layout,
        navigationView,
        headerController,
    ] = await Promise.all([
        AnchoredLayoutPlugin.init(),
        NavigationPlugin.init(),
        TabHeaderController.init()
    ])

    await layout.addTopView(headerController.viewPlugin)
    await layout.setContentView(navigationView)
    await navigationView.setHeaderBar(headerController.viewPlugin)

    navigationView.defaultWebViewPluginOptions = {
        disableLoader: []
    }

    headerController.viewPlugin.on('click:back', () => {
        navigationView.back()
    })

    navigationView.on('cart-updated', (data) => {
        headerController.updateCounter(data.count)
    })

    navigationView.on('open:cart-modal', () => {
        headerController.showCartModal()
    })

    return new TabController(tabItem, layout, navigationView, headerController)
}

TabController.prototype.reload = async function() {
    const tabCanGoBack = await this.navigationView.canGoBack()
    const topPlugin = await this.navigationView.getTopPlugin()

    // In the case where this tab failed its initial navigation
    // a reload is insufficient so instead, we navigate to
    // our root URL.
    if (!tabCanGoBack) {
        // If we have never even tried to navigate, we might not
        // even have a top plugin...
        if (topPlugin && typeof topPlugin.navigate === 'function') {
            topPlugin.navigate(this.tabItem.rootUrl)
        } else {
            this.navigationView.navigateToUrl(this.tabItem.rootUrl)
        }
    } else if (typeof topPlugin.reload === 'function') {
        topPlugin.reload()
    } else {
        console.log(`Top plugin on ${this.tabItem.title} tab does not support reload!`)
    }

    this.loaded = true
}

TabController.prototype.activate = function() {
    if (this.isActive) {
        this.navigationView.popToRoot({animated: true})
    } else {
        this.isActive = true

        if (!this.loaded) {
            this.reload()
        }
    }
}

TabController.prototype.deactivate = function() {
    this.isActive = false
}

TabController.prototype.canGoBack = async function() {
    return await this.navigationView.canGoBack()
}

TabController.prototype.back = async function() {
    const webView = await this.navigationView.getTopPlugin()
    const canGoBack = await webView.canGoBack()
    if (canGoBack) {
        webView.back()
    } else {
        Application.closeApp()
    }

}

export default TabController
