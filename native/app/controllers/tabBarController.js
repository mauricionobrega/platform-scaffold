import AnchoredLayoutPlugin from 'astro/plugins/anchoredLayoutPlugin'
import TabBarPlugin from 'astro/plugins/tabBarPlugin'

import TabBarConfig from '../config/tabBarConfig'

const TabBarController = function(tabBar, layout) {
    this.tabBar = tabBar
    this.viewPlugin = layout
    this.activeTabId = null

    // Set up regular tabs' layouts
    this._tabViews = {}
    this._navigationControllers = {}
}

TabBarController.init = async function() {
    const tabBar = await TabBarPlugin.init()
    const layout = await AnchoredLayoutPlugin.init()

    await tabBar.setItems(TabBarConfig.items)
    await layout.addBottomView(tabBar)

    return new TabBarController(tabBar, layout)
}

export default TabBarController
