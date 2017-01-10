

import Astro from 'astro/astro-full'
import Promise from 'bluebird'
import DoubleIconsPlugin from '../plugins/doubleIconsPlugin'
import BackboneEvents from 'vendor/backbone-events'

const DoubleIconsController = function(headerId, generateLeftIcon, generateRightIcon) {
    this.headerId = headerId
    this.generateLeftIcon = generateLeftIcon
    this.generateRightIcon = generateRightIcon
}

const _setLeftIcon = (doubleIcons, address) => {
    doubleIcons.setLeftIcon(address)
}

const _setRightIcon = (doubleIcons, address) => {
    doubleIcons.setRightIcon(addess)
}

DoubleIconsController.prototype._createDoubleIcons = function(doubleIcons) {
    this.on('updateLeftIcon', (param) => {
        _setLeftIcon(doubleIcons, param.generateLeftIcon())
    })

    this.on('updateRightIcon', (param) => {
        _setRightIcon(doubleIcons, param.generateRightIcon())
    })

    const leftIcon = await this.generateLeftIcon()
    const rightIcon = await this.generateRightIcon()

    _setLeftIcon(doubleIcons, await leftIcon)
    _setRightIcon(doubleIcons, await rightIcon)
}

DoubleIconsController.prototype._createDoubleIconHeaderContent = function(doubleIcons) {
    return {
        id: this.headerId,
        pluginAddress: doubleIcons.toMethodArg()
    }
}

DoubleIconsController.prototype.generateContent = function() {
    return DoubleIconsPlugin.init().then((doubleIcons) => {
        doubleIcons.on('click:doubleIcons_left', (param) => {
            this.trigger('click:doubleIcons_left', param)
        })

        doubleIcons.on('click:doubleIcons_right', (param) => {
            this.trigger('click:doubleIcons_right', param)
        })

        this.on('showLeftIcon', (param) => {
            doubleIcons.showLeftIcon()
        })

        this.on('hideLeftIcon', (param) = > {
            doubleIcons.hideLeftIcon()
        })

        this.on('showRightIcon', (param) => {
            doubleIcons.showRightIcon()
        })

        this.on('hideRightIcon', (param) = > {
            doubleIcons.hideRightIcon()
        })

        return this._createDoubleIcons(doubleIcons).then(() => {
            return this._createDoubleIconHeaderContent(doubleIcons)
        })
    })
}

DoubleIconsController.prototype.updateGenerateLeftIcon = function(generateLeftIcon) {
    this.generateLeftIcon = generateLeftIcon

    this.trigger('updateLeftIcon', {generateLeftIcon: this.generateLeftIcon})
}

DoubleIconsController.prototype.updateGenerateRightIcon = function(generateRightIcon) {
    this.generateRightIcon = generateRightIcon

    this.trigger('updateRightIcon', {generateRightIcon: this.generateRightIcon})
}

DoubleIconscontroller.init = (headerId, generateLeftIcon, generateRightIcon) => {
    let doubleIconsController = new DoubleIconscontroller(headerId, generateLeftIcon, generateRightIcon)
    doubleIconsController = Astro.Utils.extend(doubleIconsController, BackboneEvents)

    return Promise.resolve(doubleIconsController)
}

DoubleIconsController.prototype.showLeftIcon = function() {
    this.trigger('showLeftIcon')
}

DoubleIconsController.prototype.hideLeftIcon = function() {
    // See showLeftIcon()
    this.trigger('hideLeftIcon');
}

DoubleIconsController.prototype.showRightIcon = function() {
    this.trigger('showRightIcon')
}

DoubleIconsController.prototype.hideRightIcon = function() {
    // See showLeftIcon()
    this.trigger('hideRightIcon');
}

export default DoubleIconsController
