import Astro from 'astro/astro-full'
import rpcMethodNames from './app-rpc-method-names'

const AppRpc = {}

AppRpc.names = rpcMethodNames

AppRpc.onboardingShow = Astro.jsRpcMethod(AppRpc.names.onboardingShow, [])
AppRpc.onboardingHide = Astro.jsRpcMethod(AppRpc.names.onboardingHide, [])
AppRpc.onboardingHasHeader = Astro.jsRpcMethod(AppRpc.names.onboardingHasHeader, [])

export default AppRpc
