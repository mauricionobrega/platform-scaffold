/* global PROJECT_SLUG, DEBUG */
/* eslint-env worker, serviceworker */

import worker from 'progressive-web-sdk/dist/worker/main'

const CAPTURING_URL = 'https://cdn.mobify.com/capturejs/capture-latest.min.js'

worker({
    capturingURL: CAPTURING_URL,
    slug: PROJECT_SLUG,
    debug: DEBUG
})
