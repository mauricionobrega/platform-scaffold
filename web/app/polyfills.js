// Based on http://anujnair.com/blog/13-conditionally-load-multiple-polyfills-using-webpack-promises-and-code-splitting

const availablePolyfills = [
    {
        test: () => !global.fetch,
        load: () => import('whatwg-fetch')
    }, {
        test: () => true,
        load: () => import('core-js/shim')
    }
]

export const loadPolyfills = (initialize) => {
    const neededPolyfills = availablePolyfills.filter((polyfill) => polyfill.test())

    if (neededPolyfills.length) {
        const polyfillPromises = neededPolyfills.map((polyfill) => polyfill.load())
        Promise.all(polyfillPromises).then(initialize)
    } else {
        initialize()
    }
}
