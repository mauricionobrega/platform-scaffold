/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* global MESSAGING_ENABLED */

// React
import React from 'react'
import {render} from 'react-dom'

// Onboarding
import Onboarding from '../../containers/onboarding/container'

// Astro
import Astro from '../../vendor/astro-client'
import {jsRpcMethod} from '../../utils/astro-integration'

import Stylesheet from './index.scss' // eslint-disable-line no-unused-vars

window.Progressive = {
    AstroPromise: Promise.resolve(Astro)
}

const location = {
    imageURL: 'static/img/onboarding/location.png',
    imageAlt: 'Location',
    title: 'Find the best deals near you!',
    subtitle: 'Enable location services to see your local stores, product availability, and local deals.',
    actionButton: {
        title: 'ENABLE',
        action: () => {}
    }
}

const notifications = {
    imageURL: 'static/img/onboarding/notifications.png',
    imageAlt: 'Notifications',
    title: 'Stay in the loop!',
    subtitle: 'Hear about the latest deals, promotions, specials, and exclusive offers through Notifications!',
    actionButton: {
        title: 'ENABLE',
        action: () => {
            jsRpcMethod('push:enable', [])()
        }
    }
}

const login = {
    imageURL: 'static/img/onboarding/logo.png',
    imageAlt: 'Merlin\'s Potions',
    subtitle: 'Speed up your shopping experience, save your address information and more by registering with Merlin\'s Potions.',
    actionButton: {
        title: 'SIGN IN',
        action: () => {
            jsRpcMethod('sign-in:Show', [])()
        }
    },
    laterButton: {
        title: 'LATER',
        action: () => {
            jsRpcMethod('onboardingHide', [])()
        }
    },
    primaryButton: {
        title: 'REGISTER NOW',
        action: () => {
            jsRpcMethod('register:Show', [])()
        }
    }
}

const carouselData = {
    location,
    login
}

// MESSAGING_ENABLED is replaced at build time by webpack.
if (MESSAGING_ENABLED) {
    carouselData.notifications = notifications
}

const rootEl = document.getElementsByClassName('react-target')[0]

// There's a bug in the Android webview that doesn't immediately register
// the event handlers for the carousel, so we delay rendering to next runloop
setTimeout(() => {
    render(<Onboarding carouselData={carouselData} />, rootEl)
}, 0)
