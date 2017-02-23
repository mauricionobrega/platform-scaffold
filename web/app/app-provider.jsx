import React, {PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {Router, Route, IndexRoute} from 'progressive-web-sdk/dist/routing'
import {Provider} from 'react-redux'

// Containers
import App from './containers/app/container'
import {Cart, CheckoutConfirmation, CheckoutPayment, CheckoutShipping, Home, Login, ProductList, ProductDetails} from './containers/templates'
import CheckoutHeader from './containers/checkout-header/container'
import CheckoutFooter from './containers/checkout-footer/container'

import {getURL} from './utils/utils'
import {isRunningInAstro, pwaNavigate} from './utils/astro-integration'

// We define an initial OnChange as a no-op for non-Astro use
let OnChange = () => {}

if (isRunningInAstro) {
    // Redefine OnChange to enable Astro integration
    OnChange = (prevState, nextState, replace, callback) => {
        if (nextState.location.action === 'POP') {
            callback()
            return
        }

        pwaNavigate({url: getURL(nextState)}).then(() => {
            callback()
        })
    }
}

const AppProvider = ({store}) => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App} onChange={OnChange}>
                <IndexRoute component={Home} routeName="home" />
                <Route component={Cart} path="checkout/cart/" routeName="cart" />
                <Route component={Login} path="customer/account/login/" routeName="signin" />
                <Route component={Login} path="customer/account/create/" routeName="register" />
                <Route component={ProductList} path="potions.html" routeName="productListPage" />
                <Route component={ProductList} path="books.html" routeName="productListPage" />
                <Route component={ProductList} path="ingredients.html" routeName="productListPage" />
                <Route component={ProductList} path="supplies.html" routeName="productListPage" />
                <Route component={ProductList} path="new-arrivals.html" routeName="productListPage" />
                <Route component={ProductList} path="charms.html" routeName="productListPage" />
                <Route component={ProductDetails} path="checkout/cart/configure/id/*/product_id/*/" routeName="cartEditPage" />
                <Route component={ProductDetails} path="*.html" routeName="productDetailsPage" />
                <Route component={CheckoutShipping} path="checkout/" routeName="checkingShipping" Header={CheckoutHeader} Footer={CheckoutFooter} />
                <Route component={CheckoutPayment} path="checkout/payment/" fetchUrl="/checkout/#payment" routeName="checkout-payment" Header={CheckoutHeader} Footer={CheckoutFooter} />
                <Route component={CheckoutConfirmation} path="checkout/confirmation/" routeName="checkingConfirmation" suppressFetch Header={CheckoutHeader} Footer={CheckoutFooter} />
            </Route>
        </Router>
    </Provider>
)

AppProvider.propTypes = {
    store: PropTypes.object
}

export default AppProvider
