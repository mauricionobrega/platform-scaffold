import isRunningIn from 'mobify-progressive-app-sdk/dist/astro-detect'

export const isRunningInAstro = isRunningIn.app()

/**
 * Triggers an event into the native Astro app.
 * This is exactly the same method as documented here:
 * http://astro.mobify.com/latest/advanced/webview-appjs-communication/
 */
export const trigger = isRunningInAstro
    ? window.Progressive.Astro.trigger
    : () => {}

/**
 * Triggers a JS RPC method in Astro
 * http://astro.mobify.com/latest/advanced/webview-appjs-communication/
 */
export const jsRpcMethod = isRunningInAstro
    ? window.Progressive.Astro.jsRpcMethod
    : () => {}

/**
 * Provides coordination with the native app (Astro)
 * If we aren't in a native app then the function
 * is just a no-op.
 */
export const pwaNavigate = isRunningInAstro
    ? jsRpcMethod('pwa-navigate', ['url'])
    : () => {}
