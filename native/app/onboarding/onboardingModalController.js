
import Promise from 'bluebird'
import Astro from 'progressive-app-sdk/astro-full'
import ModalViewPlugin from 'progressive-app-sdk/plugins/modalViewPlugin'
import SettingsStore from 'progressive-app-sdk/settings-store'
import OnboardingController from './onboardingController'
import AppRpc from '../global/app-rpc'
import AppEvents from '../global/app-events'
import Application from 'progressive-app-sdk/application'

const OnboardingModalEvents = {
    // raised when onboarding modal is hidden
    onboardingHidden: 'onboarding:hidden',
    // raised when onboarding modal is displayed
    onboardingShown: 'onboarding:shown',

    registerSelected: 'account:register',
    signInSelected: 'account:sign-in',
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

    Astro.registerRpcMethod(AppRpc.names.registerShow, [], () => {
        onboardingModalController.hide({selected: OnboardingModalEvents.registerSelected})
    })

    Astro.registerRpcMethod(AppRpc.names.signInShow, [], () => {
        onboardingModalController.hide({selected: OnboardingModalEvents.signInSelected})
    })

    return onboardingModalController
}

OnboardingModalController.prototype.show = async function(params) {
    params = Astro.Utils.extend({forced: false}, params)
    const isFirstRunKey = 'isFirstRunKey'

    const isFirstRun = await SettingsStore.get(isFirstRunKey) === null

    // Onboarding modal should be triggered when the app first runs
    if (isFirstRun || params.forced) {
        this.isShowing = true
        await this.modalView.show({animated: true})
        await Application.setStatusBarDarkText()

        AppEvents.on(OnboardingModalEvents.onboardingHidden, () => {
            SettingsStore.set(isFirstRunKey, 'false')
        })
        AppEvents.trigger(OnboardingModalEvents.onboardingShown)
    }
}

OnboardingModalController.prototype.hide = function(param) {
    this.isShowing = false
    this.modalView.hide({animated: true})

    AppEvents.trigger(OnboardingModalEvents.onboardingHidden, param)
}

OnboardingModalController.prototype.isActiveItem = function() {
    return this.isShowing
}

OnboardingModalController.prototype.canGoBack = function() {
    return this.onboardingController.canGoBack()
}

export {OnboardingModalEvents}

export default OnboardingModalController
