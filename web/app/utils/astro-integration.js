import Astro from '../vendor/astro-client'

export const isRunningInAstro = Astro.isRunningInApp()

/**
 * Provides coordination with the native app (Astro)
 * If we aren't in a native app then the function
 * is just a no-op.
 */
export const pwaNavigate = Astro.isRunningInApp()
    ? Astro.jsRpcMethod('pwa-navigate', ['url'])
    : () => {}
