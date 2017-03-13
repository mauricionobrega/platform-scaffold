import polyfill from 'progressive-web-sdk/dist/polyfill'
import {initCacheManifest} from 'progressive-web-sdk/dist/asset-utils'
import cacheHashManifest from '../tmp/cache-hash-manifest.json'

// React
import React from 'react'
import {render} from 'react-dom'

// Redux
import configureStore from './store'

// Router
import Router from './router'

// Stylesheet: importing it here compiles the SCSS into CSS. The CSS is actually
// added to the markup in `loader.js`
import Stylesheet from './stylesheet.scss' // eslint-disable-line no-unused-vars

import {analyticManager} from 'progressive-web-sdk/dist/analytics/analytic-manager'
import {clientAnalytics} from './utils/analytics/client-analytics'

import connector from './integration-manager/_merlins-connector'
import {registerConnector} from './integration-manager'

polyfill()

analyticManager.init({
    projectSlug: AJS_SLUG,      // eslint-disable-line no-undef
    isDebug: false
}, clientAnalytics)
initCacheManifest(cacheHashManifest)

registerConnector(connector)

const store = configureStore()

const rootEl = document.getElementsByClassName('react-target')[0]

render(<Router store={store} />, rootEl)
