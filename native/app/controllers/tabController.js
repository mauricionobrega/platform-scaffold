import Promise from 'bluebird'

import AnchoredLayoutPlugin from 'astro/plugins/anchoredLayoutPlugin'
import HeaderBarPlugin from 'astro/plugins/headerBarPlugin'
import NavigationPlugin from 'astro/plugins/navigationPlugin'

import baseConfig from '../config/baseConfig'

const TabController = function(tabItem, layout, headerBar, navigationView) {
    this.tabItem = tabItem
    this.id = tabItem.id
    this.viewPlugin = layout
    this.headerBar = headerBar
    this.navigationView = navigationView

    this.isActive = false
    this.loaded = false
    console.log('TabController constructor finished')
}

TabController.init = async function(tabItem) {
    const [
        layout,
        headerBar,
        navigationView
    ] = await Promise.all([
        AnchoredLayoutPlugin.init(),
        HeaderBarPlugin.init(),
        NavigationPlugin.init()
    ])

    await layout.addTopView(headerBar)
    await layout.setContentView(navigationView)
    await navigationView.setHeaderBar(headerBar)

    await headerBar.setCenterIcon(baseConfig.logoUrl, 'logo')
    await headerBar.setTextColor(baseConfig.colors.whiteColor)
    await headerBar.setBackgroundColor(baseConfig.colors.primaryColor)
    await headerBar.setOpaque()

    headerBar.on('click:back', () => {
        navigationView.back()
    })

    return new TabController(tabItem, layout, headerBar, navigationView)
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
            this.navigationView.navigate(this.tabItem.rootUrl)
        }
    } else if (typeof topPlugin.reload === 'function') {
        topPlugin.reload()
    } else {
        console.log(`Top plugin on ${this.tabItem.title} tab does not support reload!`)
    }

    this.loaded = true
}

TabController.prototype.activate = async function() {
    this.isActive = true

    if (!this.loaded) {
        await this.reload()
    }
}

TabController.prototype.deactivate = async function() {
    this.isActive = false
}

export default TabController
