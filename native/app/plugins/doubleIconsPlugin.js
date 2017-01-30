import Astro from 'progressive-app-sdk/astro-full'
import PluginManager from 'progressive-app-sdk/plugin-manager'

const DoubleIconsPlugin = function() {}

DoubleIconsPlugin.pluginName = 'DoubleIconsPlugin'

DoubleIconsPlugin.init = function(callback) {
    return PluginManager.createPlugin(DoubleIconsPlugin, callback)
}

DoubleIconsPlugin.prototype.setLeftIcon = Astro.nativeRpcMethod('setLeftIcon', ['address'])
DoubleIconsPlugin.prototype.setRightIcon = Astro.nativeRpcMethod('setRightIcon', ['address']);

export default DoubleIconsPlugin
