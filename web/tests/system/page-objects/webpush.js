/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/**
 * Methods for manipulating the Webpush iframe and cookies
 */
const selectors = {
    loaderScript: 'script[src*="webpush-client-loader.min.js"]',
    noThanksButton: '.c-button.c--deny.js-deny',
    iframe: '.mobifywebpush'
}

const activeVisitCookie = 'mobify.webpush.activeVisit'
const WEB_PUSH_ID = 'webpushid'

const Webpush = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

Webpush.prototype.setup = function() {
    this.browser
        .waitForElementPresent(selectors.loaderScript)
        .executeAsync((done) => {
            // The Mobify Push Messaging client will load the necessary setup
            // scripts after the window.load event
            if (document.readyState === 'complete') {
                done()
            } else {
                window.addEventListener('load', done)
            }
        })
        // Add an id to the webpush frame for easier manipulation
        .waitForElementPresent(selectors.iframe)
        .execute((iframe, webPushId) => {
            document.querySelectorAll(iframe)[0].setAttribute('id', webPushId)
        }, [selectors.iframe, WEB_PUSH_ID])
        .waitForElementPresent(`#${WEB_PUSH_ID}`)
        // Switch to the frame and dismiss it from within - we don't need to
        // subscribe as part of this test
        .frame(WEB_PUSH_ID)
        .click(selectors.noThanksButton)
        .pause(500)

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
