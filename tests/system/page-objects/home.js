const selectors = {
    wrapper: '.t-home',
    skipLinks: '.c-skip-links',
    skipToMain: '.c-skip-links__anchor:first-of-type',
    skipToNav: '.c-skip-links__anchor:nth-child(2n)',
    skipToFooter: '.c-skip-links__anchor:last-of-type',
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

