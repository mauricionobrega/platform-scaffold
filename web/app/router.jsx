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

import {fetchHomeData} from './integration-manager/home/commands'
import {fetchCartPageData} from './integration-manager/cart/commands'
import {fetchProductListData} from './integration-manager/categories/commands'
import {fetchPdpData} from './integration-manager/products/commands'
import {fetchRegisterData, fetchSigninData} from './integration-manager/login/commands'
import {fetchCheckoutShippingData, fetchCheckoutPaymentData, fetchCheckoutConfirmationData} from './integration-manager/checkout/commands'

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

                <IndexRoute component={Home} routeName="home" fetcher={fetchHomeData} />
                <Route component={Cart} path="checkout/cart/" routeName="cart" fetcher={fetchCartPageData} />
                <Route component={Login} path="customer/account/login/" routeName="signin" fetcher={fetchSigninData} />
                <Route component={Login} path="customer/account/create/" routeName="register" fetcher={fetchRegisterData} />
                <Route component={ProductList} path="potions.html" routeName="productListPage" fetcher={fetchProductListData} />
                <Route component={ProductList} path="books.html" routeName="productListPage" fetcher={fetchProductListData} />
                <Route component={ProductList} path="ingredients.html" routeName="productListPage" fetcher={fetchProductListData} />
                <Route component={ProductList} path="supplies.html" routeName="productListPage" fetcher={fetchProductListData} />
                <Route component={ProductList} path="new-arrivals.html" routeName="productListPage" fetcher={fetchProductListData} />
                <Route component={ProductList} path="charms.html" routeName="productListPage" fetcher={fetchProductListData} />
                <Route component={ProductDetails} path="checkout/cart/configure/id/*/product_id/*/" routeName="cartEditPage" fetcher={fetchPdpData} />
                <Route component={ProductDetails} path="*.html" routeName="productDetailsPage" fetcher={fetchPdpData} />
                <Route component={CheckoutShipping} path="checkout/" routeName="checkingShipping" Header={CheckoutHeader} Footer={CheckoutFooter} headerHasSignIn fetcher={fetchCheckoutShippingData} />
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
                    fetcher={fetchCheckoutPaymentData}
                />
                <Route
                    component={CheckoutConfirmation}
                    path="checkout/onepage/success/"
                    routeName="checkout-confirmation"
                    Header={CheckoutHeader}
                    Footer={CheckoutFooter}
                    fetcher={fetchCheckoutConfirmationData}
                />


                <Route component={Home} path="*/Home-Show*" routeName="home" fetcher={fetchHomeData} />
                <Route component={ProductList} path="*/womens*" routeName="productListPage" fetcher={fetchProductListData} />
                <Route component={ProductList} path="*/mens*" routeName="productListPage" fetcher={fetchProductListData} />
                <Route component={ProductList} path="*/newarrivals*" routeName="productListPage" fetcher={fetchProductListData} />
                <Route component={ProductList} path="*/electronics*" routeName="productListPage" fetcher={fetchProductListData} />
                <Route component={ProductList} path="*/Search-Show?*" routeName="productListPage" fetcher={fetchProductListData} />
                <Route
                    component={CheckoutShipping}
                    path="*/COShipping-Start*"
                    routeName="checkingShipping"
                    Header={CheckoutHeader}
                    Footer={CheckoutFooter}
                    headerHasSignIn
                    fetcher={fetchCheckoutShippingData}
                />
                <Route component={Login} path="*/Account-Show*" routeName="signin" fetcher={fetchSigninData} />
                <Route component={Cart} path="*/Cart-Show*" routeName="cart" fetcher={fetchCartPageData} />

            </Route>
        </SDKRouter>
    </Provider>
)

Router.propTypes = {
    store: PropTypes.object
}

export default Router
