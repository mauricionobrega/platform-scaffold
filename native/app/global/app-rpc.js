import Astro from 'astro/astro-full'

const AppRpc = {}

AppRpc.names = {
    onboardingShow: 'onboardingShow',
    onboardingHide: 'onboardingHide',
    onboardingHasHeader: 'onboardingHasHeader'
}

AppRpc.onboardingShow = Astro.jsRpcMethod(AppRpc.names.onboardingShow, [])
AppRpc.onboardingHide = Astro.jsRpcMethod(AppRpc.names.onboardingHide, [])
AppRpc.onboardingHasHeader = Astro.jsRpcMethod(AppRpc.names.onboardingHasHeader, [])

export default AppRpc
