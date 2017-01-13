const selectors = {
    plpTemplateIdentifier: '.t-plp__container',
    pdpItem(index) {
        return `.pw-list .t-plp__product-tile:nth-child(${index}) .pw--is-loaded`
    }
}

const PLP = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

PLP.prototype.navigateToPDP = function(productIndex) {
    // Navigate from PLP to PDP
    this.browser
        .log('Navigating to PDP')
        .waitForElementVisible(selectors.pdpItem(productIndex))
        .click(selectors.pdpItem(productIndex))
        .waitUntilMobified()
    return this
}

export default PLP
