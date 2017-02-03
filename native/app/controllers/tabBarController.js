import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import TabBarPlugin from 'progressive-app-sdk/plugins/tabBarPlugin'
import Astro from 'progressive-app-sdk/astro-full'

import {Events} from './accountSegmentationController'
import TabController from './tabController'
import {tabBarConfig} from '../config/tabBarConfig'
import rpcMethodNames from '../global/app-rpc-method-names'
import AppEvents from '../global/app-events'
import AccountSegmentationController from './accountSegmentationController'

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

    Astro.registerRpcMethod(rpcMethodNames.registerShow, [], () => {
        tabBar.selectItem('account')
        AppEvents.trigger(Events.registerSelected)
    })

    Astro.registerRpcMethod(rpcMethodNames.signInShow, [], () => {
        tabBar.selectItem('account')
        AppEvents.trigger(Events.signInSelected)
    })

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

export default TabBarController
