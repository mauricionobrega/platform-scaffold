// Astro
import Application from 'astro/application'

import TabBarController from './controllers/tabBarController'
import {getInitialTabId} from './config/tabBarConfig'

window.run = async function() {
    const tabBarController = await TabBarController.init()

    await Application.setMainViewPlugin(tabBarController.viewPlugin)

    const initialTabId = getInitialTabId()
    if (initialTabId) {
        tabBarController.selectTab(initialTabId)
    }

    Application.dismissLaunchImage()
}

// Comment out next line for JS debugging
window.run()
