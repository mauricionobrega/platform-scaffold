import Astro from 'progressive-app-sdk/astro-full'
import PluginManager from 'astro/plugin-manager'

const DoubleIconsPlugin = () => {}

DoubleIconsPlugin.pluginName = 'DoubleIconsPlugin'

DoubleIconsPlugin.init = (callback) => {
    return PluginManager.createPlugin(DoubleIconsPlugin, callback)
}

DoubleIconsPlugin.prototype.setLeftIcon = Astro.nativeRpcMethod('setLeftIcon', ['address'])
DoubleIconsPlugin.prototype.setRightIcon = Astro.nativeRpcMethod('setRightIcon', ['address'])

export default DoubleIconsPlugin
