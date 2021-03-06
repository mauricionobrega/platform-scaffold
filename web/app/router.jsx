/* eslint-disable import/namespace */
/* eslint-disable import/named */
import React, {PropTypes} from 'react'
import {Router as SDKRouter, Route, IndexRoute} from 'progressive-web-sdk/dist/routing'
import {Provider} from 'react-redux'

// Containers
import App from './containers/app/container'
// These templates are code-split out of the main bundle.
import {Cart, CheckoutConfirmation, CheckoutPayment, CheckoutShipping, Login, ProductList, ProductDetails} from './containers/templates'
// We build this into the app so we can load the home page right away
import Home from './containers/home/container'
import CheckoutHeader from './containers/checkout-header/container'
import CheckoutFooter from './containers/checkout-footer/container'

import {initHomePage} from './integration-manager/home/commands'
import {initCartPage} from './integration-manager/cart/commands'
import {initProductListPage} from './integration-manager/categories/commands'
import {initProductDetailsPage} from './integration-manager/products/commands'
import {initRegisterPage, initLoginPage} from './integration-manager/account/commands'
import {initCheckoutShippingPage, initCheckoutPaymentPage, initCheckoutConfirmationPage} from './integration-manager/checkout/commands'

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

const Router = ({store}) => (
    <Provider store={store}>
        <SDKRouter>
            <Route path="/" component={App} onChange={OnChange}>
                <IndexRoute component={Home} routeName="home" fetchAction={initHomePage} />
                <Route component={Cart} path="checkout/cart/" routeName="cart" fetchAction={initCartPage} />
                <Route component={Login} path="customer/account/login/" routeName="signin" fetchAction={initLoginPage} />
                <Route component={Login} path="customer/account/create/" routeName="register" fetchAction={initRegisterPage} />
                <Route component={ProductList} path="potions.html" routeName="productListPage" fetchAction={initProductListPage} />
                <Route component={ProductList} path="books.html" routeName="productListPage" fetchAction={initProductListPage} />
                <Route component={ProductList} path="ingredients.html" routeName="productListPage" fetchAction={initProductListPage} />
                <Route component={ProductList} path="supplies.html" routeName="productListPage" fetchAction={initProductListPage} />
                <Route component={ProductList} path="new-arrivals.html" routeName="productListPage" fetchAction={initProductListPage} />
                <Route component={ProductList} path="charms.html" routeName="productListPage" fetchAction={initProductListPage} />
                <Route component={ProductList} path="catalogsearch/result/*" routeName="searchResultPage" fetchAction={initProductListPage} />
                {/* Careful. The routeName on this 'configure' route is used to change how the ProductDetails component renders */}
                <Route component={ProductDetails} path="checkout/cart/configure/id/*/product_id/*/" routeName="cartEditPage" fetchAction={initProductDetailsPage} />
                <Route component={ProductDetails} path="*.html" routeName="productDetailsPage" fetchAction={initProductDetailsPage} />
                <Route
                    component={CheckoutShipping}
                    path="checkout/"
                    routeName="checkout-shipping"
                    Header={CheckoutHeader}
                    Footer={CheckoutFooter}
                    headerHasSignIn
                    fetchAction={initCheckoutShippingPage}
                />
                {/*
                    The URL for the payment page on desktop is /checkout/#payment,
                    but routing wasn't working properly when using this as the
                    route path so we specify a fetchUrl to make sure when we
                    fetch it's using the URL for the desktop page
                */}
                <Route
                    component={CheckoutPayment}
                    path="checkout/payment/"
                    fetchUrl="/checkout/#payment"
                    routeName="checkout-payment"
                    Header={CheckoutHeader}
                    Footer={CheckoutFooter}
                    fetchAction={initCheckoutPaymentPage}
                />
                <Route
                    component={CheckoutConfirmation}
                    path="checkout/onepage/success/"
                    routeName="checkout-confirmation"
                    Header={CheckoutHeader}
                    Footer={CheckoutFooter}
                    fetchAction={initCheckoutConfirmationPage}
                />

                {/* SFCC Connector routes */}
                <Route component={Home} path="*/Home-Show*" routeName="home" fetchAction={initHomePage} />
                <Route component={ProductList} path="*/womens*" routeName="productListPage" fetchAction={initProductListPage} />
                <Route component={ProductList} path="*/mens*" routeName="productListPage" fetchAction={initProductListPage} />
                <Route component={ProductList} path="*/newarrivals*" routeName="productListPage" fetchAction={initProductListPage} />
                <Route component={ProductList} path="*/electronics*" routeName="productListPage" fetchAction={initProductListPage} />
                <Route component={ProductList} path="*/Search-Show?*" routeName="productListPage" fetchAction={initProductListPage} />
                <Route
                    component={CheckoutShipping}
                    path="*/COShipping-Start*"
                    routeName="checkout-shipping"
                    Header={CheckoutHeader}
                    Footer={CheckoutFooter}
                    headerHasSignIn
                    fetchAction={initCheckoutShippingPage}
                />
                <Route
                    component={CheckoutPayment}
                    path="*/COBilling-Start*"
                    routeName="checkout-payment"
                    Header={CheckoutHeader}
                    Footer={CheckoutFooter}
                    fetchAction={initCheckoutPaymentPage}
                />
                <Route component={Login} path="*/Account-Show*" routeName="signin" fetchAction={initLoginPage} />
                <Route component={Cart} path="*/Cart-Show*" routeName="cart" fetchAction={initCartPage} />

                <Route
                    component={CheckoutConfirmation}
                    path="*/COSummary-Submit*"
                    routeName="checkout-confirmation"
                    Header={CheckoutHeader}
                    Footer={CheckoutFooter}
                    fetchAction={initCheckoutConfirmationPage}
                />

            </Route>
        </SDKRouter>
    </Provider>
)

Router.propTypes = {
    store: PropTypes.object
}

export default Router
