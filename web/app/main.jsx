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

import {initMobifyAnalytics} from 'progressive-web-sdk/dist/analytics'

import connector from './integration-manager/merlins-connector'
import {registerConnector} from './integration-manager'

polyfill()

initMobifyAnalytics(AJS_SLUG) // eslint-disable-line no-undef
initCacheManifest(cacheHashManifest)

registerConnector(connector)

const store = configureStore()

const rootEl = document.getElementsByClassName('react-target')[0]

render(<Router store={store} />, rootEl)
