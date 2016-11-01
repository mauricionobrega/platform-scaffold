import React, {PropTypes} from 'react'
import {Router, Route, IndexRoute} from 'progressive-web-sdk/dist/routing'
import {triggerMobifyPageView} from 'progressive-web-sdk/dist/analytics'
import {Provider} from 'react-redux'
import * as appActions from './containers/app/actions'

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

    const getPageType = (routerState) => {
        const route = routerState.routes[1]
        const name = route.component.name
        return name === 'Connect' ? route.component.WrappedComponent.name : name
    }

    const getRouteName = (routerState) => {
        return routerState.routes[1].routeName
    }

    const onEnter = (nextState) => {
        const routeName = getRouteName(nextState)
        triggerMobifyPageView(routeName)
        store.dispatch(appActions.fetchPage(getURL(nextState), getPageType(nextState)))
    }

    const onChange = (prevState, nextState) => {
        const prevURL = getURL(prevState)
        const nextURL = getURL(nextState)
        if (nextURL !== prevURL) {
            const pageType = getPageType(nextState)
            store.dispatch(appActions.fetchPage(nextURL, pageType))
        }
    }

    return (
        <Provider store={store}>
            <Router>
                <Route path="/" component={App} onEnter={onEnter} onChange={onChange}>
                    <IndexRoute component={Home} routeName="home" />
                    <Route component={Login} path="customer/account/login" routeName="login" />
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
