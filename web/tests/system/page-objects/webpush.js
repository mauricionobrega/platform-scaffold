const loaderScript = 'script[src*="webpush-client-loader.min.js"]'
const activeVisitCookie = 'mobify.webpush.activeVisit'

const Webpush = function(browser) {
    this.browser = browser
}

Webpush.prototype.setup = function() {
    this.browser
        .waitForElementPresent(loaderScript)
            // eslint-disable prefer-arrow-callback
            .executeAsync(function callback(done) {
                if (document.readyState === 'complete') {
                    done()
                } else {
                    window.addEventListener('load', function callback() {
                        done()
                    })
                }
            })
            // eslint-enable prefer-arrow-callback

    return this
}

Webpush.prototype.checkVisitCount = function(count) {
    this.browser
        .getCookie(activeVisitCookie, function callback(result) {
            this.assert.equal(result.value, count)
        })

    return this
}

export default Webpush
