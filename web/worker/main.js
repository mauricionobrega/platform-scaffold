/* global PROJECT_SLUG, DEBUG */
/* eslint-env worker, serviceworker */

import worker from 'progressive-web-sdk/dist/worker/main'

worker({
    slug: PROJECT_SLUG,
    isDebug: DEBUG
})
