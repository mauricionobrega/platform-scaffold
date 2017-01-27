import process from 'process'
import Home from '../page-objects/home'
import PLP from '../page-objects/plp'
import PDP from '../page-objects/pdp'
import Cart from '../page-objects/cart'
import Checkout from '../page-objects/checkout'

let home
let plp
let pdp
let cart
let checkout

const PLP_INDEX = process.env.PLP_INDEX || 2
const PRODUCT_INDEX = process.env.PRODUCT_INDEX || 1

export default {
    '@tags': ['checkout'],

    before: (browser) => {
        home = new Home(browser)
        plp = new PLP(browser)
        pdp = new PDP(browser)
        cart = new Cart(browser)
        checkout = new Checkout(browser)
    },

    after: (browser) => {
        browser.end()
    },

    'Checkout - Guest - Step 1 - Navigate to Home': (browser) => {
        browser
            .preview()
            .waitForElementVisible(home.selectors.wrapper)
            .assert.visible(home.selectors.wrapper)
    },

    'Checkout - Guest - Step 2 - Navigate from Home to PLP': (browser) => {
        home.navigateToPLP(PLP_INDEX)
        browser
            .waitForElementVisible(plp.selectors.plpTemplateIdentifier)
            .assert.visible(plp.selectors.plpTemplateIdentifier)
    },

    'Checkout - Guest - Step 3 - Navigate from PLP to PDP': (browser) => {
        plp.navigateToPDP(PRODUCT_INDEX)
        browser
            .waitForElementVisible(pdp.selectors.pdpTemplateIdentifier)
            .assert.visible(pdp.selectors.pdpTemplateIdentifier)
    },

    'Checkout - Guest - Step 4 - Add item to Shopping Cart': (browser) => {
        pdp.addItemToCart()
        browser
            .waitForElementVisible(pdp.selectors.itemAdded)
            .assert.visible(pdp.selectors.itemAdded)
    },


    'Checkout - Guest - Step 5 - Navigate from PDP to Shopping Cart': (browser) => {
        pdp.navigateToCart()
        browser
            .waitForElementVisible(cart.selectors.cartTemplateIdentifier)
            .assert.visible(cart.selectors.cartTemplateIdentifier)
    },

    'Checkout - Guest - Step 6 - Navigate from Shopping Cart to Checkout Sign In or Continue as Guest page': (browser) => {
        cart.navigateToCheckout()
        browser
            .waitForElementVisible(checkout.selectors.checkoutTemplateIdentifier)
            .assert.visible(checkout.selectors.checkoutTemplateIdentifier)
    },

    'Checkout - Guest - Step 7 - Fill out Guest Checkout Shipping Info form': (browser) => {
        checkout.fillShippingInfo()
        browser
            .waitForElementVisible(checkout.selectors.lastShippingInfo)
            .assert.valueContains(checkout.selectors.lastShippingInfo, checkout.userData.lastShippingInfo)
    },

    // 'Checkout - Guest - Step 8 - Fill out Guest Checkout Payment Details form': (browser) => {
    //     checkout.continueToPayment()
    //     checkout.fillPaymentDetails()
    //     browser
    //         .waitForElementVisible(checkout.selectors.lastPaymentDetail)
    //         .assert.valueContains(checkout.selectors.lastPaymentDetail, checkout.userData.lastPaymentDetail)
    // },

    // 'Checkout - Guest - Step 10 - Verify Submit Order button is visible': (browser) => {
    //     browser
    //         .waitForElementVisible(checkout.selectors.submitOrder)
    //         .assert.visible(checkout.selectors.submitOrder)
    // }
}
