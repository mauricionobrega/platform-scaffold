import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import TabBarPlugin from 'progressive-app-sdk/plugins/tabBarPlugin'

import AccountSegmentationController, {Events} from './accountSegmentationController'
import TabController from './tabController'
import {tabBarConfig} from '../config/tabBarConfig'

const TabBarController = function(tabBar, layout, tabControllers) {
    this.tabBar = tabBar
    this.viewPlugin = layout

    this.activeTabId = Object.keys(tabControllers).find((key) => {
        return tabControllers[key].isActive
    })

    this._tabControllers = tabControllers

    this.tabBar.on('itemSelect', (data) => this._tabSelected(data.id))
}

TabBarController.init = async function() {
    const tabBar = await TabBarPlugin.init()
    const layout = await AnchoredLayoutPlugin.init()

    const tabControllers = {}

    console.log(Events)

    const tabControllerPromises = tabBarConfig.items.map((item) => {
        if (item.type === 'custom') {
            return AccountSegmentationController.init().then((controller) => {
                tabControllers[item.id] = controller
            })
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
    this._tabControllers.account.showRegistration()
}

TabBarController.prototype.showSignIn = function() {
    this.tabBar.selectItem('account')
    this.accountTabController.showSignIn()
}

export default TabBarController
