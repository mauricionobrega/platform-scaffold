import {polyfill} from 'es6-promise'
polyfill()

// React
import {render} from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import useScroll from 'scroll-behavior/lib/useStandardScroll'

// Redux
import {Provider} from 'react-redux'
import configureStore from './store'

// Containers
import App from './containers/app/container'
import Home from './containers/home/container'
import PLP from './containers/plp/container'

const store = configureStore()
const scrollHistory = useScroll(() => browserHistory)()

render(
    <Provider store={store}>
        <Router history={scrollHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} routeName="home" />
                <Route component={PLP} path="potions.html" routeName="productListPage" />
            </Route>
        </Router>
    </Provider>,
    document.getElementsByClassName('react-target')[0]
)
