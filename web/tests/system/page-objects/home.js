const selectors = {
    wrapper: '.t-home',
    skipLinks: '.pw-skip-links',
    skipToMain: '.pw-skip-links__anchor:first-of-type',
    skipToNav: '.pw-skip-links__anchor:nth-child(2n)',
    skipToFooter: '.pw-skip-links__anchor:last-of-type',
    plpItem: '#app-wrap a:nth-of-type(2)'
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
