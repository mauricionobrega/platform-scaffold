import React, {PropTypes} from 'react'
import {Router, Route, IndexRoute} from 'progressive-web-sdk/dist/routing'
import {triggerMobifyPageView} from 'progressive-web-sdk/dist/analytics'
import {Provider} from 'react-redux'
import * as appActions from './containers/app/actions'
import {getComponentType} from './utils/utils'
import Astro from './vendor/astro-client'

// Containers
import App from './containers/app/container'
import Cart from './containers/cart/container'
import Home from './containers/home/container'
import Login from './containers/login/container'
import PLP from './containers/plp/container'
import PDP from './containers/pdp/container'
import CheckoutShipping from './containers/checkout-shipping/container'
import CheckoutPayment from './containers/checkout-payment/container'
import CheckoutConfirmation from './containers/checkout-confirmation/container'
import CheckoutHeader from './containers/checkout-header/container'
import CheckoutFooter from './containers/checkout-footer/container'

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

    const shouldFetchPage = (routerState) => !routerState.routes[1].suppressFetch

    const getPageComponent = (routerState) => getComponentType(routerState.routes[1].component)

    const getRouteName = (routerState) => routerState.routes[1].routeName

    const dispatchFetchPage = (nextState) => store.dispatch(appActions.fetchPage(getURL(nextState), getPageComponent(nextState), getRouteName(nextState)))

    const onEnter = (nextState) => {
        if (shouldFetchPage(nextState)) {
            dispatchFetchPage(nextState)
        }
    }

    const onChange = (prevState, nextState) => {
        const prevURL = getURL(prevState)
        const nextURL = getURL(nextState)

        if (nextURL !== prevURL) {
            if (nextState.location.action.toLowerCase() !== 'pop' && Astro.isRunningInApp()) {
                Astro.trigger('pwa-navigate', {
                    url: nextURL
                })
            }
            if (shouldFetchPage(nextState)) {
                dispatchFetchPage(nextState)
            }
        }

        store.dispatch(appActions.removeAllNotifications())
    }

    return (
        <Provider store={store}>
            <Router>
                <Route path="/" component={App} onEnter={onEnter} onChange={onChange}>
                    <IndexRoute component={Home} routeName="home" />
                    <Route component={Cart} path="checkout/cart/" routeName="cart" fetchPage="false" />
                    <Route component={Login} path="customer/account/login/" routeName="signin" />
                    <Route component={Login} path="customer/account/create/" routeName="register" />
                    <Route component={PLP} path="potions.html" routeName="productListPage" />
                    <Route component={PLP} path="books.html" routeName="productListPage" />
                    <Route component={PLP} path="ingredients.html" routeName="productListPage" />
                    <Route component={PLP} path="supplies.html" routeName="productListPage" />
                    <Route component={PLP} path="new-arrivals.html" routeName="productListPage" />
                    <Route component={PLP} path="charms.html" suppressFetch routeName="productListPage" />
                    <Route component={PDP} path="*.html" routeName="productDetailsPage" />
                    <Route component={CheckoutShipping} path="checkout/shipping/" routeName="checkingShipping" suppressFetch Header={CheckoutHeader} Footer={CheckoutFooter} />
                    <Route component={CheckoutPayment} path="checkout/payment/" routeName="checkingPayment" suppressFetch Header={CheckoutHeader} Footer={CheckoutFooter} />
                    <Route component={CheckoutConfirmation} path="checkout/confirmation/" routeName="checkingConfirmation" suppressFetch Header={CheckoutHeader} Footer={CheckoutFooter} />
                </Route>
            </Router>
        </Provider>
    )
}

AppProvider.propTypes = {
    store: PropTypes.object
}

export default AppProvider
