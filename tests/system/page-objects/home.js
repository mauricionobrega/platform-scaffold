const selectors = {
    wrapper: '.t-home',
    skipLinks: '.c-skip-links',
    skipToMain: '.c-skip-links__anchor:first-of-type',
    skipToNav: '.c-skip-links__anchor:nth-child(2n)',
    skipToFooter: '.c-skip-links__anchor:last-of-type',
}

const Home = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

export default Home
