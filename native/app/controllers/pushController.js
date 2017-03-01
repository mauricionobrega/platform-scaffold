import Astro from 'progressive-app-sdk/astro-full'

import PushPlugin from 'progressive-app-sdk/plugins/pushPlugin'
import EngagementController from 'progressive-app-sdk/controllers/engagementController'

const PushController = function(pushPlugin) {
    this.plugin = pushPlugin
}

PushController.init = async function() {
    const pushSiteId = 'merlinspotions'
    const mobifySlugName = 'progressive-web-scaffold'

    const engagementPromise = EngagementController.init(mobifySlugName)
    const pushPlugin = await PushPlugin.init(pushSiteId, engagementPromise)

    if (Astro.isRunningInAndroidApp()) {
        const notificationIconPath = 'file:///push_notification_icon.png'
        await pushPlugin.setNotificationIconPath(notificationIconPath)
    }

    return new PushController(pushPlugin)
}

PushController.prototype.subscribeTest = async function() {
    const subscriptionStatus = await this.plugin.getSubscriptionStatus()
    if (subscriptionStatus.canSubscribe) {
        this.plugin.subscribeTest()
    }
}

PushController.prototype.subscribe = async function() {
    const subscriptionStatus = await this.plugin.getSubscriptionStatus()
    if (subscriptionStatus.canSubscribe) {
        this.plugin.subscribe()
    }
}

export default PushController
