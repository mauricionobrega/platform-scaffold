import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import TabBarPlugin from 'progressive-app-sdk/plugins/tabBarPlugin'

import {tabBarConfig} from '../config/tabBarConfig'
import TabController from './tabController'
import AccountTabController from './accountTabController'

const TabBarController = function(tabBar, layout, tabControllers) {
    this.tabBar = tabBar
    this.viewPlugin = layout

    this.activeTabId = Object.keys(tabControllers).find((key) => {
        return tabControllers[key].isActive
    })

    this._tabControllers = tabControllers
    this.accountTabController = tabControllers.account

    this.tabBar.on('itemSelect', (data) => this._tabSelected(data.id))
}

TabBarController.init = async function() {
    const tabBar = await TabBarPlugin.init()
    const layout = await AnchoredLayoutPlugin.init()

    const tabControllers = {}

    const tabControllerPromises = tabBarConfig.items.map((item) => {
        if (item.type === 'custom') {
            switch (item.id) {
                case 'account':
                    return AccountTabController.init().then((controller) => {
                        tabControllers[item.id] = controller
                    })
                default:
                    return null
            }
        } else {
            return TabController.init(item).then((controller) => {
                tabControllers[item.id] = controller
            })
        }
    })

    await Promise.all(tabControllerPromises)

    await tabBar.setItems(tabBarConfig.items)
    await layout.addBottomView(tabBar)

    return new TabBarController(tabBar, layout, tabControllers)
}

TabBarController.prototype._tabSelected = function(tabId) {
    const newTabController = this._tabControllers[tabId]

    if (this.activeTabId !== tabId) {
        const oldTabController = this.getActiveController()
        if (oldTabController) {
            oldTabController.deactivate()
        }
        this.activeTabId = tabId
        this.viewPlugin.setContentView(newTabController.viewPlugin)
    }
    newTabController.activate()
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

TabBarController.prototype.showRegistration = function() {
    this.tabBar.selectItem('account')
    this.accountTabController.showRegistration()
}

TabBarController.prototype.showSignIn = function() {
    this.tabBar.selectItem('account')
    this.accountTabController.showSignIn()
}

TabBarController.prototype.backActiveItem = function() {
    if (this.canGoBack()) {
        const activeTab = this.getActiveController()
        activeTab.back()
    }
}

TabBarController.prototype.canGoBack = function() {
    const activeTab = this.getActiveController()
    return activeTab.canGoBack()
}

export default TabBarController
