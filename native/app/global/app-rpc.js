import Astro from 'astro/astro-full'
import RpcEventNames from './app-event-names'

const AppRpc = {}

AppRpc.names = RpcEventNames

AppRpc.onboardingShow = Astro.jsRpcMethod(AppRpc.names.onboardingShow, [])
AppRpc.onboardingHide = Astro.jsRpcMethod(AppRpc.names.onboardingHide, [])
AppRpc.onboardingHasHeader = Astro.jsRpcMethod(AppRpc.names.onboardingHasHeader, [])

export default AppRpc
