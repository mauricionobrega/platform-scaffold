
import Promise from 'bluebird'
import Astro from 'astro/astro-full'
import ModalViewPlugin from 'astro/plugins/modalViewPlugin'
import SettingsStore from 'astro/settings-store'
import OnboardingController from './onboardingController'
import AppRpc from '../../global/app-rpc'
import AppEvents from '../../global/app-events'

const OnboardingModalEvents = {
    // raised when onboarding modal is hidden
    onboardingHidden: 'onboarding:hidden',
    // raised when onboarding modal is displayed
    onboardingShown: 'onboarding:shown'
}

const OnboardingModalController = function(modalView, onboardingController) {
    this.isShowing = false
    this.modalView = modalView
    this.onboardingController = onboardingController
}

OnboardingModalController.init = async function() {
    const [
        modalView,
        onboardingController
    ] = await Promise.all([
        ModalViewPlugin.init(),
        OnboardingController.init()
    ])

    modalView.setContentView(onboardingController.viewPlugin)

    // This registers a close handler on the header bar to dismiss
    // the modal. Without a header bar, the developer is responsible
    // for implementing a way to dismiss the modal.
    const onboardingModalController = new OnboardingModalController(modalView, onboardingController)

    // Onboarding modal RPCs
    Astro.registerRpcMethod(AppRpc.names.onboardingShow, [], () => {
        onboardingModalController.show({forced: false})
    })

    Astro.registerRpcMethod(AppRpc.names.onboardingHide, [], () => {
        onboardingModalController.hide()
    })

    return onboardingModalController
}

OnboardingModalController.prototype.show = async function(params) {
    params = Astro.Utils.extend({forced: false}, params)
    const shouldShowOnboardingModalKey = 'shouldShowOnboardingModal'

    const isFirstRun = await SettingsStore.get(shouldShowOnboardingModalKey) === null

    // Onboarding modal should be triggered when the app first runs
    if (isFirstRun || params.forced) {
        this.isShowing = true
        this.modalView.show({animated: true})

        // Promise will be resolved when weonboardinglcome modal is dismissed
        AppEvents.on(OnboardingModalEvents.onboardingHidden, () => {
            SettingsStore.set(shouldShowOnboardingModalKey, 'false') // We should extend the SettingsStore to not only take strings in
            return
        })
        AppEvents.trigger(OnboardingModalEvents.onboardingShown)
    } else {
        throw new Error()
    }
}

OnboardingModalController.prototype.hide = function() {
    this.isShowing = false
    this.modalView.hide({animated: true})
    AppEvents.trigger(OnboardingModalEvents.onboardingHidden)
}

OnboardingModalController.prototype.isActiveItem = function() {
    return this.isShowing
}

OnboardingModalController.prototype.canGoBack = function() {
    return this.onboardingController.canGoBack()
}

export default OnboardingModalController
