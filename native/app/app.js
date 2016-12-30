/* global AstroNative */

// Astro
import Application from 'astro/application'
import MobifyPreviewPlugin from 'astro/plugins/mobifyPreviewPlugin'
import PreviewController from 'astro/controllers/previewController'

import baseConfig from './config/baseConfig'
import TabBarController from './controllers/tabBarController'
import {getInitialTabId} from './config/tabBarConfig'

window.run = async function() {
    const runApp = async function() {
        const tabBarController = await TabBarController.init()

        await Application.setMainViewPlugin(tabBarController.viewPlugin)

        const initialTabId = getInitialTabId()
        if (initialTabId) {
            tabBarController.selectTab(initialTabId)
        }

        Application.dismissLaunchImage()
    }

    // Preview support
    const runAppPreview = async () => {
        const previewPlugin = await MobifyPreviewPlugin.init()
        await previewPlugin.preview(baseConfig.baseURL, baseConfig.previewBundle)
        runApp()
    }

    const initalizeAppWithAstroPreview = async () => {
        const previewController = await PreviewController.init()

        Application.on('previewToggled', () => {
            previewController.presentPreviewAlert()
        })

        const previewEnabled = await previewController.isPreviewEnabled()
        if (previewEnabled) {
            runAppPreview()
        } else {
            runApp()
        }
    }

    if (AstroNative.Configuration.ASTRO_PREVIEW) {
        initalizeAppWithAstroPreview()
    } else {
        runApp()
    }
}

// Comment out next line for JS debugging
window.run()
