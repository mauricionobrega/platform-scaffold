import {createAction} from '../../../utils/utils'

import {plpParser, pdpParser} from './parser'

export const receivePlpProductData = createAction('Receive PLP product data')
export const receivePdpProductData = createAction('Receive PDP product data')

export const processPlp = ({payload: {$, $response}}) =>
    receivePlpProductData(plpParser($, $response))
export const processPdp = ({payload: {$, $response, url}}) =>
    receivePdpProductData({[url]: pdpParser($, $response)})
