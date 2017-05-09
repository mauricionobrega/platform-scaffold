/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/**
 * globals module
 * Duncan integration
 */
const DuncanEvents = {
    EVENT_NAMES: {
        EVENT: 'mobify-pwa-event',
        PAGE_VIEW: 'pwa-page-view',
    },
    EVENTS: {},
    dispatch: function(eventName) { // eslint-disable-line object-shorthand
        if (!this.EVENT_NAMES.hasOwnProperty(eventName)) {
            console.log('No eventName for', eventName)
            return
        }

        this.EVENTS[eventName] = this.EVENTS[eventName] || new window.CustomEvent(this.EVENT_NAMES.EVENT, {
            detail: this.EVENT_NAMES[eventName]
        })

        window.dispatchEvent(this.EVENTS[eventName])
    }
}

/**
 * The `analyticsConstants.pageview` event is called on React mount, but we track
 * our own first page view when Duncan loads. We need to specifically avoid tracking
 * the React mount pageview.
 */
let hasIgnoredFirstCall = false
const pageView = (force = false) => {
    if (hasIgnoredFirstCall || force) {
        DuncanEvents.dispatch('PAGE_VIEW')
    }

    hasIgnoredFirstCall = true
}

export default {
    // Private member provided for flexibility's sake - but perhaps best to have
    // this removed once we move to the SDK
    _core: DuncanEvents,
    pageView
}
