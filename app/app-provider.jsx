import React, {PropTypes} from 'react'
import {Router, Route, IndexRoute} from 'progressive-web-sdk/dist/routing'
import {triggerMobifyPageView} from 'progressive-web-sdk/dist/analytics'
import {Provider} from 'react-redux'
import * as appActions from './containers/app/actions'
import {getComponentName} from './utils/utils'

// Containers
import App from './containers/app/container'
import Home from './containers/home/container'
import Login from './containers/login/container'
import PLP from './containers/plp/container'


const AppProvider = ({store}) => {
    /**
     * Given the current router state, get the corresponding URL on the
     * desktop site. Ignores #fragments in the router state.
     */
    const getURL = (routerState) => {
        return [
            window.location.protocol,
            '//',
            window.location.host,
            routerState.location.pathname,
            routerState.location.search
        ].join('')
    }

    const getPageType = (routerState) => getComponentName(routerState.routes[1].component)

    const dispatchRouteChanged = (nextState) => store.dispatch(appActions.onRouteChanged(getPageType(nextState)))

    const dispatchFetchPage = (nextState) => store.dispatch(appActions.fetchPage(getURL(nextState), getPageType(nextState)))

    const onEnter = (nextState) => {
        triggerMobifyPageView(nextState.routes[1].routeName)
        dispatchRouteChanged(nextState)
        dispatchFetchPage(nextState)
    }

    const onChange = (prevState, nextState) => {
        const prevURL = getURL(prevState)
        const nextURL = getURL(nextState)

        if (nextURL !== prevURL) {
            dispatchRouteChanged(nextState)
            dispatchFetchPage(nextState)
        }
    }

    return (
        <Provider store={store}>
            <Router>
                <Route path="/" component={App} onEnter={onEnter} onChange={onChange}>
                    <IndexRoute component={Home} routeName="home" />
                    <Route component={Login} path="customer/account/login" routeName="login" />
                    <Route component={Login} path="customer/account/create" routeName="register" />
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
