import React, {PropTypes} from 'react'
import {Router, Route, IndexRoute} from 'progressive-web-sdk/dist/routing'
import {triggerMobifyPageView} from 'progressive-web-sdk/dist/analytics'
import {Provider} from 'react-redux'

// Containers
import App from './containers/app/container'
import Home from './containers/home/container'
import Login from './containers/login/container'
import PLP from './containers/plp/container'

const triggerPageView = (nextState) => {
    const routeName = nextState.routes[1].routeName
    triggerMobifyPageView(routeName)
}

const handleChange = (prevState, nextState) => {
    triggerPageView(nextState)
}

const handleEnter = (nextState) => {
    triggerPageView(nextState)
}

const AppProvider = ({store}) => {
    return (
        <Provider store={store}>
            <Router>
                <Route path="/" component={App} onEnter={handleEnter} onChange={handleChange}>
                    <IndexRoute component={Home} routeName="home" />
                    <Route component={Login} path="customer/account/login/" routeName="login" />
                    <Route component={PLP} path="*.html" routeName="productListPage" />
                </Route>
            </Router>
        </Provider>
    )
}

AppProvider.propTypes = {
    store: PropTypes.object
}

export default AppProvider
