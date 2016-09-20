const selectors = {
    homeTemplateIdentifier: '.t-home', // Used in workflow to assert you have reached the page
    plpItem: '.plp .item .selector'
}

const Home = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

Home.prototype.navigateToPLP = function() {
    // Navigate from Home to PLP
    this.browser
        .log('Navigating to PLP')
        .waitForElementVisible(selectors.plpItem)
        .click(selectors.plpItem)
        .waitUntilMobified()
    return this
}

export default Home

