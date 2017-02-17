const selectors = {
    plpTemplateIdentifier: '.t-product-list__container',
    productDetailsItem(index) {
        return `.pw-list .t-product-list__product-tile:nth-child(${index}) .pw--is-loaded`
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
