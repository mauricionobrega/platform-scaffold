import AnchoredLayoutPlugin from 'astro/plugins/anchoredLayoutPlugin'
import TabBarPlugin from 'astro/plugins/tabBarPlugin'

import TabBarConfig from '../config/tabBarConfig'
import TabController from './tabController'

const TabBarController = function(tabBar, layout, tabControllers) {
    this.tabBar = tabBar
    this.viewPlugin = layout

    this.activeTabId = Object.keys(tabControllers).find((key) => {
        return tabControllers[key].isActive
    })

    window.AstroActiveTab = this.activeTabId

    this._tabControllers = tabControllers

    this.tabBar.on('itemSelect', (data) => this._tabSelected(data.id))
}

TabBarController.init = async function() {
    const tabBar = await TabBarPlugin.init()
    const layout = await AnchoredLayoutPlugin.init()

    const tabControllers = {}

    const tabControllerPromises = TabBarConfig.items.map((item) => {
        return TabController.init(item).then((controller) => {
            // Activate the tab that has been marked as the initial tab
            if (typeof item.isInitialTab === 'boolean' && item.isInitialTab) {
                controller.activate()
            }
            tabControllers[item.id] = controller
        })
    })

    await Promise.all(tabControllerPromises)

    await tabBar.setItems(TabBarConfig.items)
    await layout.addBottomView(tabBar)

    return new TabBarController(tabBar, layout, tabControllers)
}

TabBarController.prototype._tabSelected = function(tabId) {
    if (this.activeTabId !== tabId) {
        // activeTabId is undefined during startup
        const oldTabController = this.getActiveController()
        if (oldTabController) {
            oldTabController.deactivate()
        }

        this.activeTabId = tabId
        const activeTabController = this._tabControllers[tabId]

        activeTabController.activate()

        this.viewPlugin.setContentView(activeTabController.viewPlugin)
    } else {
        this.getActiveNavigationView().popToRoot({animated: true})
    }
}

TabBarController.prototype.selectTab = function(tabId) {
    return this.tabBar.selectItem(tabId)
}

TabBarController.prototype.getActiveController = function() {
    if (!this.activeTabId) {
        return null
    }
    return this._tabControllers[this.activeTabId]
}

export default TabBarController
