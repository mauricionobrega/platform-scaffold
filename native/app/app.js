// Astro
import Application from 'astro/application'
import AnchoredLayoutPlugin from 'astro/plugins/anchoredLayoutPlugin'
import TabBarPlugin from 'astro/plugins/tabBarPlugin'

import TabBarConfig from './config/tabBarConfig'

window.run = async function() {
    // Build all the main plugins we need for the layout
    const [
        tabBar,
        mainLayout
    ] = await Promise.all([
        TabBarPlugin.init(),
        AnchoredLayoutPlugin.init()
    ])

    await tabBar.setItems(TabBarConfig.items)
    await mainLayout.addBottomView(tabBar)
    await Application.setMainViewPlugin(mainLayout)

    Application.dismissLaunchImage()
}

// Comment out next line for JS debugging
window.run()
