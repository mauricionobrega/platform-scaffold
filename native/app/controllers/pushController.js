import PushPlugin from 'progressive-app-sdk/plugins/pushPlugin'
import EngagementController from 'progressive-app-sdk/controllers/engagementController'

const PushController = function(pushPlugin) {
    this.plugin = pushPlugin
}
PushController.init = async function() {
    const pushSiteId = 'merlins-potions'
    const mobifySlugName = 'merlins-potions'

    const pushPlugin = await PushPlugin.init(pushSiteId, EngagementController.init(mobifySlugName))

    return new PushController(pushPlugin)
}

PushController.prototype.subscriptionStatus = async function() {
    return await this.plugin.getSubscriptionStatus()
}

PushController.prototype.subscribeTest = async function() {
    await this.plugin.subscribeTest()
}

export default PushController
