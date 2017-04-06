/**
 * Duncan integration
 *
 * Duncan was written at a time when we did not have single-page applications, and
 * so it assumes it's loaded on each page load, and counts page visits that way.
 * In a PWA context, we need to handle this explicitly ourselves.
 */
import * as analyticConstants from 'progressive-web-sdk/dist/analytics/analytic-constants'
import Distributor from 'progressive-web-sdk/dist/analytics/distributors/distributor'

import Duncan from './duncan'

const handlers = {
    [analyticConstants.pageview]: () => Duncan.pageView()
}

class DuncanDistributor extends Distributor {}

export const pushMessaging = new DuncanDistributor(handlers)
