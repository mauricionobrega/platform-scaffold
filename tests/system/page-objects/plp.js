const selectors = {
    plpTemplateIdentifier: '.t-plp', // Used in workflow to assert you have reached the page
    pdpItem: '.pdp .item .selector'
}

const PLP = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

PLP.prototype.navigateToPDP = function() {
    // Navigate from PLP to PDP
    this.browser
        .log('Navigating to PDP')
        .waitForElementVisible(selectors.pdpItem)
        .click(selectors.pdpItem)
        .waitUntilMobified()
    return this
}

export default PLP
