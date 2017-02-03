// React
import React from 'react'
import {render} from 'react-dom'

// Onboarding
import Onboarding from '../../containers/onboarding/container'

// Astro
import Astro from '../../vendor/astro-client'

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
        action: () => {}
    }
}

const login = {
    imageURL: 'static/img/onboarding/logo.png',
    imageAlt: 'Merlin\'s Potions',
    subtitle: 'Speed up your shopping experience, save your address information and more by registering with Merlin\'s Potions.',
    actionButton: {
        title: 'SIGN IN',
        action: () => {}
    },
    laterButton: {
        title: 'LATER',
        action: () => {
            Astro.jsRpcMethod('onboardingHide', [])()
        }
    },
    primaryButton: {
        title: 'REGISTER NOW',
        action: () => {}
    }
}

const carouselData = {
    location,
    notifications,
    login
}

import Stylesheet from './index.scss' // eslint-disable-line no-unused-vars

const rootEl = document.getElementsByClassName('react-target')[0]

render(<Onboarding carouselData={carouselData} />, rootEl)
