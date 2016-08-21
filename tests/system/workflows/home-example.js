import Home from '../page-objects/home'

let home

export default {
    before: (browser) => {
        home = new Home(browser)
    },

    after: (browser) => {
        browser.end()
    },

    'Home Page': (browser) => {
        browser
            .preview()
            .waitForElementVisible(home.selectors.wrapper)
            .assert.visible(home.selectors.wrapper)
    }
}
