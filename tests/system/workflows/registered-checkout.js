import Home from '../page-objects/home'
import PLP from '../page-objects/plp'
import PDP from '../page-objects/pdp'
// import Cart from '../page-objects/cart'
// import Checkout from '../page-objects/checkout'

let home
let plp
let pdp
// let cart
// let checkout

/*eslint-disable */
const PLP_INDEX = process.env.PLP_INDEX || 2
const PRODUCT_INDEX = process.env.PRODUCT_INDEX || 1
/*eslint-disable */

export default {
    '@tags': ['checkout'],

    before: (browser) => {
        home = new Home(browser)
        plp = new PLP(browser)
        pdp = new PDP(browser)
        // cart = new Cart(browser)
        // checkout = new Checkout(browser)
    },

    after: (browser) => {
        browser.end()
    },

    'Checkout - Registered - Step 1 - Navigate to Home': (browser) => {
        browser
            .preview()
            .waitForElementVisible(home.selectors.wrapper)
            .assert.visible(home.selectors.wrapper)
    },

    'Checkout - Registered - Step 2 - Navigate from Home to PLP': (browser) => {
        home.navigateToPLP(PLP_INDEX)
        browser
            .waitForElementVisible(plp.selectors.plpTemplateIdentifier)
            .assert.visible(plp.selectors.plpTemplateIdentifier)
    },

    'Checkout - Registered - Step 3 - Navigate from PLP to PDP': (browser) => {
        plp.navigateToPDP(PRODUCT_INDEX)
        browser
            .waitForElementVisible(pdp.selectors.pdpTemplateIdentifier)
            .assert.visible(pdp.selectors.pdpTemplateIdentifier)
    },

    'Checkout - Registered - Step 4 - Add item to Shopping Cart': (browser) => {
        pdp.addItemToCart()
        browser
            .waitForElementVisible(pdp.selectors.itemAdded)
            .assert.visible(pdp.selectors.itemAdded)
    },
/* TODO: Uncomment the following once the Progressive Web build for Merlin's Potions has been completed.

    'Checkout - Registered - Step 5 - Navigate from PDP to Shopping Cart': (browser) => {
        pdp.navigateToCart()
        browser
            .waitForElementVisible(cart.selectors.cartTemplateIdentifier)
            .assert.visible(cart.selectors.cartTemplateIdentifier)
    },

    'Checkout - Registered - Step 6 - Navigate from Shopping Cart to Checkout Sign In or Continue as Guest page': (browser) => {
        cart.navigateToCheckout()
        browser
            .waitForElementVisible(checkout.selectors.checkoutAccountTemplateIdentifier)
            .assert.visible(checkout.selectors.checkoutAccountTemplateIdentifier)
    },

    'Checkout - Registered - Step 7 - Continue to Registered Checkout': (browser) => {
        checkout.continueAsRegistered()
        browser
            .waitForElementVisible(checkout.selectors.checkoutTemplateIdentifier)
            .assert.visible(checkout.selectors.checkoutTemplateIdentifier)
    },

    'Checkout - Registered - Step 8 - Fill out Registered Checkout Payment Details form': (browser) => {
        checkout.fillPaymentDetails()
        browser
            .waitForElementVisible(checkout.selectors.lastPaymentDetail)
            .assert.containsValue(checkout.selectors.lastPaymentDetail, checkout.userData.lastPaymentDetail)
    },

    'Checkout - Registered - Step 9 - Verify Submit Order button is visible': (browser) => {
        browser
            .waitForElementVisible(checkout.selectors.submitOrder)
            .assert.visible(checkout.selectors.submitOrder)
    }
*/
}
