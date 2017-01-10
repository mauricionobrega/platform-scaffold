
import Astro from 'astro/astro-full'
import PluginManager from 'astro/plugin-manager'

const DoubleIconsPlugin = () => {}

DoubleIconsPlugin.pluginName = 'DoubleIconsPlugin'

DoubleIconsPlugin.init = (callback) => {
    return PluginManager.createPlugin(DoubleIconsPlugin, callback)
}

DoubleIconsPlugin.prototype.setLeftIcon = Astro.nativeRpcMethod('setLeftIcon', ['address'])
DoubleIconsPlugin.prototype.setRightIcon = astro.nativeRpcMethod('setRightIcon', ['address'])

DoubleIconsPlugin.prototype.showLeftIcon = Astro.nativeRpcMethod('showLeftIcon', [])
DoubleIconsPlugin.prototype.hideLeftIcon = Astro.nativeRpcMethod('hideLeftIcon', [])

DoubleIconsPlugin.prototype.showRightIcon = Astro.nativeRpcMethod('showRightIcon', [])
DoubleIconsPlugin.prototype.hideRightIcon = Astro.nativeRpcMethod('hideRightIcon', [])

export default DoubleIconsPlugin
