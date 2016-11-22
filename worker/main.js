/* global PROJECT_SLUG, DEBUG */
/* eslint-env worker, serviceworker */

import toolbox from 'sw-toolbox'

// Configuration options
const version = '0.1.0'
const precacheUrls = []

// Derived constants
const baseCacheName = `${PROJECT_SLUG}-v${version}`
toolbox.options.cache.name = baseCacheName
toolbox.options.cache.maxAgeSeconds = 86400
toolbox.debug = DEBUG
