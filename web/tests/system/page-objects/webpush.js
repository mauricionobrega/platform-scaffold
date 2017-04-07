const loaderScript = 'script[src*="webpush-client-loader.min.js"]'
const activeVisitCookie = 'mobify.webpush.activeVisit'

const Webpush = function(browser) {
    this.browser = browser
}

Webpush.prototype.setup = function() {
    this.browser
        .waitForElementPresent(loaderScript)
            .executeAsync((done) => {
                // The Mobify Push Messaging client will load the necessary setup
                // scripts after the window.load event
                if (document.readyState === 'complete') {
                    done()
                } else {
                    window.addEventListener('load', done)
                }
            })

    return this
}

Webpush.prototype.assertVisitCount = function(count) {
    this.browser
        .getCookie(activeVisitCookie, function(result) {
            this.assert.equal(result.value, count)
        })

    return this
}

export default Webpush
