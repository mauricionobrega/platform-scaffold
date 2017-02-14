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

    pushPlugin.on('subscribeTestTriggered', () => {
        console.log('\n########## TEST ##########\n')
    })

    pushPlugin.on('messageReceivedWhenAppIsOpen', (params) => {
        console.log(params.title)
    })

    return new PushController(pushPlugin)
}

PushController.prototype.subscriptionStatus = async function() {
    return await this.plugin.getSubscriptionStatus()
}

PushController.prototype.subscribeTest = async function() {
    await this.plugin.subscribeTest()
}

PushController.prototype.subscribe = async function() {
    await this.plugin.subscribe()
}

export default PushController
