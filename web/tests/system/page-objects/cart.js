/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const selectors = {
    cartTemplateIdentifier: '.t-cart.t--loaded',
    cartCheckout: '.qa-cart__checkout',
    removeItem: '.qa-cart__remove-item',
    confirmRemove: '.t-cart__remove-item-confirmation-modal .c--secondary',
    emptyCart: '.t-cart__empty'
}

const Cart = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

Cart.prototype.navigateToCheckout = function() {
    // Navigate from Cart to Checkout
    this.browser
        .log('Navigating to Checkout')
        .waitForElementVisible(selectors.cartCheckout)
        .click(selectors.cartCheckout)
        .waitUntilMobified()
    return this
}

Cart.prototype.removeItems = function() {
    // Remove all items from the cart
    const self = this
    this.browser
        .log('Removing item')
        .url('https://www.merlinspotions.com/checkout/cart/')
        .waitForElementVisible(selectors.cartTemplateIdentifier)
        .element('css selector', selectors.removeItem, (result) => {
            if (result.value && result.value.ELEMENT) {
                self.browser
                    .log('Removing item from cart')
                    .click(selectors.removeItem)
                    .waitForElementVisible(selectors.confirmRemove)
                    .click(selectors.confirmRemove)
                    .waitUntilMobified()
                self.removeItems()
            }
        })
        .waitForElementVisible(selectors.emptyCart)
    return this
}

export default Cart
