/**
 * Duncan integration
 */
const PWA_EVENT = 'mobify-pwa-event'
const PWA_PAGE_VIEW = 'pwa-page-view'

/**
 * This method expects to be called from `dispatchRouteChange` and so makes an
 * assumption that it will be called on initial React mount. Given this assumption,
 * don't run which avoids a duplicate page view count.
 */
let shouldDispatch = false
const pageView = () => {
    if (shouldDispatch) {
        const pageView = new CustomEvent(PWA_EVENT, {
            detail: PWA_PAGE_VIEW
        })

        window.dispatchEvent(pageView)
    }

    shouldDispatch = true
}

export default {
    pageView
}
