import {initCacheManifest, getBuildOrigin} from 'progressive-web-sdk/dist/asset-utils'
import cacheHashManifest from '../tmp/cache-hash-manifest.json'

let origin = getBuildOrigin()

if (!/\/$/.test(origin)) {
    origin += '/'
}

// Set publicPath so bundle chunks will be loaded from the correct location
__webpack_public_path__ = origin // eslint-disable-line camelcase, no-undef

// React
import React from 'react'
import {render} from 'react-dom'

// Router
import Router from './router'

// Redux
import configureStore from './store'

// Stylesheet: importing it here compiles the SCSS into CSS. The CSS is actually
// added to the markup in `loader.js`
import Stylesheet from './stylesheet.scss' // eslint-disable-line no-unused-vars

import {analyticManager} from 'progressive-web-sdk/dist/analytics/analytic-manager'
import {clientAnalytics} from './utils/analytics/client-analytics'

import {Connector} from './integration-manager/_merlins-connector'
// import {Connector} from './integration-manager/_sfcc-connector'

import {registerConnector} from './integration-manager'

// This is okay to pass to both SFCC and Merlin's connectors,
// as Merlin's doesn't need a configuration object
registerConnector(Connector({
    siteID: '2017refresh',
    clientID: '5640cc6b-f5e9-466e-9134-9853e9f9db93'
}))

analyticManager.init({
    projectSlug: AJS_SLUG, // eslint-disable-line no-undef
    isDebug: false
}, clientAnalytics)
initCacheManifest(cacheHashManifest)

const store = configureStore()

const rootEl = document.getElementsByClassName('react-target')[0]

render(<Router store={store} />, rootEl)
