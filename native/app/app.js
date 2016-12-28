// Astro
import Application from 'astro/application'

import TabBarController from './controllers/tabBarController'

window.run = async function() {
    const tabBarController = await TabBarController.init()
    await Application.setMainViewPlugin(tabBarController.viewPlugin)

    Application.dismissLaunchImage()
}

// Comment out next line for JS debugging
window.run()
