const selectors = {
    productDetailsTemplateIdentifier: '.t-product-details',
    addItem: '.t-product-details__add-to-cart:not([disabled])',
    itemAdded: '.t-plp__item-added-modal .u-h4',
    goToCart: '.t-plp__item-added-modal a[href*="cart"]'
}

const ProductDetails = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

ProductDetails.prototype.addItemToCart = function() {
    // Add an item to the cart
    this.browser
        .log('Adding item to cart')
        .waitForElementVisible(selectors.addItem)
        .click(selectors.addItem)
        .waitUntilMobified()
    return this
}

ProductDetails.prototype.navigateToCart = function() {
    // Navigate from ProductDetails to Cart
    this.browser
        .log('Navigating to cart')
        .waitForElementVisible(selectors.goToCart)
        .click(selectors.goToCart)
        .waitUntilMobified()
    return this
}

export default ProductDetails
