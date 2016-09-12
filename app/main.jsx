import {polyfill} from 'es6-promise'

// React
import React from 'react'
import {render} from 'react-dom'

import {AppContainer} from 'react-hot-loader'

// Redux
import configureStore from './store'

// App provider
import AppProvider from './app-provider'

// Stylesheet: importing it here compiles the SCSS into CSS. The CSS is actually
// added to the markup in `loader.js`
import Stylesheet from './stylesheet.scss' // eslint-disable-line no-unused-vars

import {initMobifyAnalytics} from 'progressive-web-sdk/dist/analytics'

polyfill()

// TODO: replace slug with grabbing something from package.json
initMobifyAnalytics('pure-formulas-mobile')

const store = configureStore()

const rootEl = document.getElementsByClassName('react-target')[0]

render(
    <AppContainer>
        <AppProvider store={store} />
    </AppContainer>,
    rootEl
)

if (module.hot) {
    module.hot.accept('./app-provider', () => {
        // If you use Webpack 2 in ES modules mode, you can
        // use <App /> here rather than require() a <NextApp />.
        const NextAppProvider = require('./app-provider').default
        render(
            <AppContainer>
                <NextAppProvider store={store} />
            </AppContainer>,
            rootEl
        )
    })
}
