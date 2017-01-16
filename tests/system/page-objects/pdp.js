const selectors = {
    pdpTemplateIdentifier: '.t-pdp', 
    addItem: '.t-pdp__add-to-cart:not([disabled])',
    itemAdded: '.t-plp__item-added-modal .u-h4',
    goToCart: '.t-plp__item-added-modal a[href*="cart"]'
}

const PDP = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

PDP.prototype.addItemToCart = function() {
    // Add an item to the cart
    this.browser
        .log('Adding item to cart')
        .waitForElementVisible(selectors.addItem)
        .click(selectors.addItem)
        .waitUntilMobified()
    return this
}

PDP.prototype.navigateToCart = function() {
    // Navigate from PDP to Cart
    this.browser
        .log('Navigating to cart')
        .waitForElementVisible(selectors.goToCart)
        .click(selectors.goToCart)
        .waitUntilMobified()
    return this
}

export default PDP
