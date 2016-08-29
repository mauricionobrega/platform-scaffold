import {polyfill} from 'es6-promise'

// React
import React from 'react'
import {render} from 'react-dom'

// Redux
import configureStore from './store'

// App provider
import AppProvider from './app-provider'

// Stylesheet: importing it here compiles the SCSS into CSS. The CSS is actually
// added to the markup in `loader.js`
import Stylesheet from './stylesheet.scss' // eslint-disable-line no-unused-vars

polyfill()

const store = configureStore()

render(<AppProvider store={store} />, document.getElementsByClassName('react-target')[0])
