import process from 'process'
import Home from '../page-objects/home'
import ProductList from '../page-objects/product-list'
import ProductDetails from '../page-objects/product-details'
import Checkout from '../page-objects/checkout'

let home
let productList
let productDetails
let checkout

const PRODUCT_LIST_INDEX = process.env.PRODUCT_LIST_INDEX || 2
const PRODUCT_INDEX = process.env.PRODUCT_INDEX || 1

export default {
    '@tags': ['checkout'],

    before: (browser) => {
        home = new Home(browser)
        productList = new ProductList(browser)
        productDetails = new ProductDetails(browser)
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

    'Checkout - Guest - Step 2 - Navigate from Home to ProductList': (browser) => {
        home.navigateToProductList(PRODUCT_LIST_INDEX)
        browser
            .waitForElementVisible(productList.selectors.productListTemplateIdentifier)
            .assert.visible(productList.selectors.productListTemplateIdentifier)
    },

    'Checkout - Guest - Step 3 - Navigate from ProductList to ProductDetails': (browser) => {
        productList.navigateToProductDetails(PRODUCT_INDEX)
        browser
            .waitForElementVisible(productDetails.selectors.productDetailsTemplateIdentifier)
            .assert.visible(productDetails.selectors.productDetailsTemplateIdentifier)
    },

    'Checkout - Guest - Step 4 - Add item to Shopping Cart': (browser) => {
        productDetails.addItemToCart()
        browser
            .waitForElementVisible(productDetails.selectors.itemAdded)
            .assert.visible(productDetails.selectors.itemAdded)
    },


    'Checkout - Guest - Step 5 - Navigate from ProductDetails to Checkout': (browser) => {
        productDetails.navigateToCheckout()
        browser
            .waitForElementVisible(checkout.selectors.checkoutTemplateIdentifier)
            .assert.visible(checkout.selectors.checkoutTemplateIdentifier)
    },

    'Checkout - Guest - Step 6 - Fill out Guest Checkout Shipping Info form': (browser) => {
        checkout.fillShippingInfo()
        browser.waitForElementVisible(checkout.selectors.lastShippingInfo)
    },

    'Checkout - Guest - Step 7 - Fill out Guest Checkout Payment Details form': () => {
        checkout.continueToPayment()
    },

    'Checkout - Guest - Step 8 - Verify Submit Order button is visible': (browser) => {
        browser
            .waitForElementVisible(checkout.selectors.submitOrder)
            .assert.visible(checkout.selectors.submitOrder)
    }
}
