const selectors = {
    plpTemplateIdentifier: '.t-plp__container',
    productDetailsItem(index) {
        return `.pw-list .t-plp__product-tile:nth-child(${index}) .pw--is-loaded`
    }
}

const ProductList = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

ProductList.prototype.navigateToProductDetails = function(productIndex) {
    // Navigate from ProductList to ProductDetails
    this.browser
        .log('Navigating to ProductDetails')
        .waitForElementVisible(selectors.productDetailsItem(productIndex))
        .click(selectors.productDetailsItem(productIndex))
        .waitUntilMobified()
    return this
}

export default ProductList
