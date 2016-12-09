import ChildFrame from 'progressive-web-sdk/dist/iframe/child'
let $

const waitForJQuery = new Promise((resolve) => {
    let timeout
    const check = () => {
        clearTimeout(timeout)
        if (window.jQuery) {
            window.require(['jquery'], (jQuery) => {
                $ = jQuery
                resolve()
            })
        } else {
            timeout = setTimeout(check, 50)
        }
    }

    check()
})

const frame = new ChildFrame({
    debug: true,
    readyCheck: waitForJQuery
})

frame
    .registerMethod('getText', (selector) => $(selector).text())
    .registerMethod('clickTest', (selector) => new Promise((resolve) => {
        // @TODO: Determine if Magento lets us know when UI is ready
        setTimeout(() => {
            $(selector).click()
            alert('sup!')
            // Animation delay
            setTimeout(() => {
                resolve($('html').hasClass('nav-open'))
            }, 200)
        }, 5000)
    }))

