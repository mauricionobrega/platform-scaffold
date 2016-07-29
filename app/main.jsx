import {polyfill} from 'es6-promise'

// React
import {render} from 'react-dom'
import {Router, Route, IndexRoute, browserHistory, applyRouterMiddleware} from 'react-router'
import useScroll from 'react-router-scroll'

// Redux
import {Provider} from 'react-redux'
import configureStore from './store'

// Containers
import App from './containers/app/container'
import Home from './containers/home/container'
import PLP from './containers/plp/container'

// Stylesheet: importing it here compiles the SCSS into CSS. The CSS is actually
// added to the markup in `loader.js`
import Stylesheet from './stylesheet.scss' // eslint-disable-line no-unused-vars

polyfill()

const store = configureStore()

render(
    <Provider store={store}>
        <Router history={browserHistory}
            render={applyRouterMiddleware(useScroll())}
        >
            <Route path="/" component={App}>
                <IndexRoute component={Home} routeName="home" />
                <Route component={PLP} path="potions.html" routeName="productListPage" />
            </Route>
        </Router>
    </Provider>,
    document.getElementsByClassName('react-target')[0]
)
